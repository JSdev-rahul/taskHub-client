import { API_ENDPOINT } from "../../api/api_endpoints"
import { iUserPaginationQuery } from "../../utils/interfaces"
import { sendRequest } from "../constant/fetchApiHandler"
import { METHODS, replaceUrl } from "../constant/redux.constant"

export class UsersService {
  getAllUsers = (params: iUserPaginationQuery) => {
    const url = API_ENDPOINT.GET_ALL_USERS
    return sendRequest(url, METHODS.GET, null, params)
  }
  deleteUserService = (payload: string) => {
    const id = payload
    const url = replaceUrl(API_ENDPOINT.DELETE_USER, { id })
    return sendRequest(url, METHODS.DELETE)
  }
}
