export interface loginData {
  userName: string
  password: string
}
interface RoleInfo {
  id: number
  roleName: string
}
export interface UserInfo {
  fullName: string
  roleInfo: Array<RoleInfo>
  userId: number
  userName: string
}

interface MenuPublic {
  id: number
  icon: string
  path: string
  type: number
  menuName: string
}
interface MenuChildren extends MenuPublic {
  parentId: number
}
export interface MenuInfo extends MenuPublic {
  children: Array<MenuChildren>
}
export interface apiLoginType {
  id: number
  token: string
  userName: string
}
