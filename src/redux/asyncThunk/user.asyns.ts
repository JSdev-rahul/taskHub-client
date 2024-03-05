import { createAsyncThunk } from "@reduxjs/toolkit"
import { TodosService } from "../service/Todos.service"
import { ToDoListPageData } from "../../pages/Home"
import { UsersService } from "../service/user.service"
import { PageDataProps } from "../../pages/Users"

class UsersAsyncThunk {
  private usersService: UsersService

  constructor() {
    this.usersService = new UsersService()
  }

  getAllUsers = createAsyncThunk(
    "getAllUsers",
    async (payload: PageDataProps, { rejectWithValue }) => {
      try {
        const response = await this.usersService.getAllUsers(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  deleteUserAsyncThunk = createAsyncThunk(
    "deleteUserAsyncThunk",
    async (payload: string, { rejectWithValue }) => {
      try {
        const response = await this.usersService.deleteUserService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
}

export const usersAsyncThunk = new UsersAsyncThunk()
