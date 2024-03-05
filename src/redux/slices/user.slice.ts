import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { todosAsyncThunk } from "../asyncThunk/Todos.async"
import { TodoItem } from "../../components/Accordion"
import { usersAsyncThunk } from "../asyncThunk/user.asyns"

interface TodoState {
  status: "idle" | "pending" | "fulfilled" | "rejected"
  users: any
  count: number
}

const initialState: TodoState = {
  status: "idle",
  users: [],
  count: 0,
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(usersAsyncThunk.getAllUsers.pending, (state) => {
      state.status = "pending"
    })
    builder.addCase(
      usersAsyncThunk.getAllUsers.fulfilled,
      (state, action: PayloadAction<{ data: any }>) => {
        state.status = "fulfilled"
        state.count = action.payload.data.count
        state.users = action.payload.data.result // Access user property from payload
      }
    )
    builder.addCase(usersAsyncThunk.getAllUsers.rejected, (state) => {
      state.status = "rejected"
    })
  },
})

export const {} = userSlice.actions
export default userSlice.reducer
