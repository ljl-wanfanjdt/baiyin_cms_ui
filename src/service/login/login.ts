import service from '../index'
import { loginData, apiLoginType, UserInfo, userMenuType } from './type'
import { apiDataType } from '../type'
const loginApi = {
  loginRequest(data: loginData) {
    return service.request<apiDataType<apiLoginType>>({
      method: 'post',
      url: '/login',
      data
    })
  },
  getUserInfo() {
    return service.get<apiDataType<UserInfo>>({
      url: '/userRole/getUserRole'
    })
  },
  getUserMenuList(id: number) {
    return service.get<apiDataType<Array<userMenuType>>>({
      url: `/role/menu/${id}/list`
    })
  }
}

export default loginApi
