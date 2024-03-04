import { APIEndpoints } from "../../api/api_endpoints"
import { TodoFormData } from "../../pages/CreateToDoForm"
import { ToDoListPageData } from "../../pages/Home"
import { sendRequest } from "../constant/fetchApiHandler"
import { METHODS, replaceUrl } from "../constant/redux.constant"

export class TodosService {
  getAllUserTodos = (payload: ToDoListPageData) => {
    const { id, ...params } = payload
    const url = replaceUrl(APIEndpoints.getAllTodos, {
      id,
    })
    return sendRequest(url, METHODS.GET, null, params)
  }
  createNewTodoService = (payload: TodoFormData) => {
    const url = APIEndpoints.createTodo
    return sendRequest(url, METHODS.POST, payload)
  }

  deleteTodoService = (id: string | null) => {
    const url = replaceUrl(APIEndpoints.deleteTodo, {
      id,
    })
    return sendRequest(url, METHODS.DELETE)
  }
  getTodoDetailsService = (id: string | null) => {
    const url = replaceUrl(APIEndpoints.getTodoDetails, {
      id,
    })
    return sendRequest(url, METHODS.GET)
  }

  updateTodoService = (payload: TodoFormData) => {
    const { id, ...data }: any = payload
    const url = replaceUrl(APIEndpoints.updateTodo, { id })
    return sendRequest(url, METHODS.PATCH, data)
  }
}
