import fetch from '@/config/fetch'
import { getStore } from '../config/mUtils'

// 获取首页默认地址
export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
})

// 获取首页热门城市
export const hotcity = () => fetch('/v1/cities', {
  type: 'hot'
})

// 获取首页所有城市
export const groupcity = () => fetch('/v1/cities', {
  type: 'group'
})

// 获取用户信息
export const getUser = () => fetch('/v1/user', {
  user_id: getStore('user_id')
})

// 获取城市地址列表
export const getAddressList = userId => fetch(`/v1/users/${userId}/addresses`)

// 获取与cityId对应的城市名称
export const getCityName = cityId => fetch(`/v1/cities/${cityId}`)

// 获取搜索地址
export const getCityPlaces = (cityId, where) => fetch('/v1/pois', {
  type: 'search',
  city_id: cityId,
  keyword: where
})

// 获取msite页面地址信息
export const getMsiteAddress = geohash => fetch(`/v2/pois/${geohash}`)

// 获取msite页面食品类型信息
export const getMsiteFoodTypes = geohash => fetch('/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
})

/**
 * 获取msite商铺列表
 */

export const getShopList = (
  latitude,
  longitude,
  offset,
  restaurant_category_id = '',
  restaurant_category_ids = '',
  order_by = '',
  deliveryMode = '',
  support_ids = []
) => {
  let supportStr = ''
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id
    }
  })
  const data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': deliveryMode + supportStr
  }
  return fetch('/shopping/restaurants', data)
}
