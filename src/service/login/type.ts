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

export interface userMenuType {
  icon: string
  id: number
  menuName: string
  parentId?: number
  path: string
  type: string
  children?: userMenuType[]
}
export interface apiLoginType {
  id: number
  token: string
  userName: string
}
