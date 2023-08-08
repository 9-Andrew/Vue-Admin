import request from '@/utils/request'
import type {
  UserResponse,
  User,
  UserRoleResponse,
  SetUserRoleData,
} from './type'

enum API {
  USER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  USERROLE_URL = '/admin/acl/user/toAssign/',
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  DELETEUSER_URL = '/admin/acl/user/remove/',
  DELETEUSERS_URL = '/admin/acl/user/batchRemove',
}

export const reqUser = (pageNo: number, limit: number, username: string) =>
  request<any, UserResponse>(
    API.USER_URL + `${pageNo}/${limit}?username=${username}`,
  )
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
export const reqUserRole = (adminId: number) =>
  request<any, UserRoleResponse>(API.USERROLE_URL + adminId)
export const reqSetRole = (data: SetUserRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)
export const reqDeleteUser = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId)
export const reqDeleteUsers = (idList: number[]) =>
  request.delete<any, any>(API.DELETEUSERS_URL, { data: idList })
