import { API_ENDPOINT } from "../../api/api_endpoints"
import { iToDoPageData, iTodoFormData } from "../../utils/interfaces"
import { sendRequest } from "../constant/fetchApiHandler"
import { METHODS, replaceUrl } from "../constant/redux.constant"

export class TodosService {
  getAllUserTodos = (payload: iToDoPageData) => {
    const { id, ...params } = payload
    const url = replaceUrl(API_ENDPOINT.GET_ALL_TODOS, {
      id,
    })
    return sendRequest(url, METHODS.GET, null, params)
  }
  createNewTodoService = (payload: iTodoFormData) => {
    const url = API_ENDPOINT.CREATE_TODO
    return sendRequest(url, METHODS.POST, payload)
  }

  deleteTodoService = (id: string | null) => {
    console.log(id)
    const url = replaceUrl(API_ENDPOINT.DELETE_TODO, {
      id,
    })
    return sendRequest(url, METHODS.DELETE)
  }
  getTodoDetailsService = (id: string | null) => {
    const url = replaceUrl(API_ENDPOINT.GET_TODO_DETAILS, {
      id,
    })
    return sendRequest(url, METHODS.GET)
  }

  updateTodoService = (payload: iTodoFormData) => {
    const { _id, ...data }: any = payload
    const url = replaceUrl(API_ENDPOINT.UPDATE_TODO, { id: _id })
    return sendRequest(url, METHODS.PATCH, data)
  }
}
