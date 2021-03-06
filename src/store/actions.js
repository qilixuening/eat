import {
  getUser
} from '@/api/getData'
import {
  GET_USERINFO
} from './mutation-types.js'

export default {
  async getUserInfo ({ commit, state }) {
    const res = await getUser()
    commit(GET_USERINFO, res)
  }
}
