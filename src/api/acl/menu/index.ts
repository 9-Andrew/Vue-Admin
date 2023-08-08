import request from '@/utils/request'
import type { PermissionResponse, PermissionParams } from './type'

enum API {
  ALLPERMISSION = '/admin/acl/permission',
  ADDPERMISSION = '/admin/acl/permission/save',
  UPDATEPERMISSION = '/admin/acl/permission/update',
  DELELTEMENU = '/admin/acl/permission/remove/',
}

export const reqAllPermission = () =>
  request<any, PermissionResponse>(API.ALLPERMISSION)
export const reqAddOrUpdatePermission = (data: PermissionParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEPERMISSION, data)
  } else {
    return request.post<any, any>(API.ADDPERMISSION, data)
  }
}
export const reqDeleteMenu = (id: number) =>
  request.delete<any, any>(API.DELELTEMENU + id)
