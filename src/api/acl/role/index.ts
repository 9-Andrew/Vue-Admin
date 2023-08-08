import request from '@/utils/request'
import type { RoleResponse, Role, MenuResponse } from './type'

enum API {
  ROLE_URL = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save',
  UPDATEROLE_URL = '/admin/acl/role/update',
  MENU_URL = '/admin/acl/permission/toAssign/',
  ASSIGN_URL = '/admin/acl/permission/doAssign',
  DELETEROLE_URL = '/admin/acl/role/remove/',
}

export const reqRole = (pageNo: number, limit: number, roleName: string) =>
  request<any, RoleResponse>(
    API.ROLE_URL + `${pageNo}/${limit}?roleName=${roleName}`,
  )
export const reqAddOrUpdateRole = (data: Role) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
export const reqMenu = (roleId: number) =>
  request<any, MenuResponse>(API.MENU_URL + roleId)
export const reqAssign = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.ASSIGN_URL + `?roleId=${roleId}&permissionId=${permissionId}`,
  )
export const reqDeleteRole = (roleId: number) =>
  request.delete<any, any>(API.DELETEROLE_URL + roleId)
