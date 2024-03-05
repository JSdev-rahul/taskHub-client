import { APIEndpoints } from "../../api/api_endpoints"
import { PageDataProps } from "../../pages/Users"

import { sendRequest } from "../constant/fetchApiHandler"
import { METHODS, replaceUrl } from "../constant/redux.constant"

export class UsersService {
  getAllUsers = (params: PageDataProps) => {
    const url = APIEndpoints.getAllUser
    return sendRequest(url, METHODS.GET, null, params)
  }
  deleteUserService = (payload: string) => {
    const id = payload
    const url = replaceUrl(APIEndpoints.deleteUser, { id })
    return sendRequest(url, METHODS.DELETE)
  }
}
