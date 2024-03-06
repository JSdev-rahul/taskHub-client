import { createAsyncThunk } from "@reduxjs/toolkit"
import { TodosService } from "../service/Todos.service"
import { iToDoPageData, iTodoFormData } from "../../utils/interfaces"

class TodosAsyncThunk {
  private todosService: TodosService

  constructor() {
    this.todosService = new TodosService()
  }

  getUserAllTodos = createAsyncThunk(
    "getAllTodos",
    async (payload: iToDoPageData, { rejectWithValue }) => {
      try {
        const response = await this.todosService.getAllUserTodos(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  createTodoAsyncThunk = createAsyncThunk(
    "createNewTodo",
    async (payload: iTodoFormData, { rejectWithValue }) => {
      try {
        const response = await this.todosService.createNewTodoService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  deleteTodoAsyncThunk = createAsyncThunk(
    "deleteToDo",
    async (payload: string | null, { rejectWithValue }) => {
      try {
        const response = await this.todosService.deleteTodoService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  getTodosDetails = createAsyncThunk(
    "todoDetails",
    async (payload: string | null, { rejectWithValue }) => {
      try {
        const response = await this.todosService.getTodoDetailsService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  updateTodoAsyncThunk = createAsyncThunk(
    "updateTodo",
    async (payload: iTodoFormData, { rejectWithValue }) => {
      try {
        const response = await this.todosService.updateTodoService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
}

export const todosAsyncThunk = new TodosAsyncThunk()
