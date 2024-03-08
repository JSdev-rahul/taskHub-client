import { createAsyncThunk } from "@reduxjs/toolkit"
import { UsersService } from "../service/user.service"
import { iUserPaginationQuery } from "../../utils/interfaces"

class UsersAsyncThunk {
  private usersService: UsersService

  constructor() {
    this.usersService = new UsersService()
  }

  getAllUsers = createAsyncThunk(
    "getAllUsers",
    async (payload: iUserPaginationQuery, { rejectWithValue }) => {
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
  updateAvatarAsyncThunk = createAsyncThunk(
    "updateAvatarAsyncThunk",
    async (payload: FormData, { rejectWithValue }) => {
      try {
        const response = await this.usersService.updateAvatarService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
}

export const usersAsyncThunk = new UsersAsyncThunk()
