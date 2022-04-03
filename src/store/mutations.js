import {
  GET_USERINFO,
  RECORD_ADDRESS,
  SAVE_GEOHASH
} from './mutation-types.js'

// import { setStore, getStore } from '@/config/mUtils'

export default {
  // 获取用户信息存入vuex
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    };
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = { ...info }
    } else {
      state.userInfo = null
    }
  },
  // 保存geohash
  [SAVE_GEOHASH] (state, geohash) {
    state.geohash = geohash
  },
  // 保存经纬度信息
  [RECORD_ADDRESS] (state, { latitude, longitude }) {
    state.latitude = latitude
    state.longitude = longitude
  }
}
