/* eslint-disable */

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { usersAsyncThunk } from "../asyncThunk/user.asyns"
import { RequestStatus } from "../../utils/constants"

interface TodoState {
  status:
    | RequestStatus.Idle
    | RequestStatus.Pending
    | RequestStatus.Fulfilled
    | RequestStatus.Rejected
  users: any
  count: number
}

const initialState: TodoState = {
  status: RequestStatus.Idle,
  users: [],
  count: 0,
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(usersAsyncThunk.getAllUsers.pending, (state) => {
      state.status = RequestStatus.Pending
    })
    builder.addCase(
      usersAsyncThunk.getAllUsers.fulfilled,
      (state, action: PayloadAction<{ data: any }>) => {
        state.status = RequestStatus.Fulfilled
        if (action.payload?.data) {
          state.count = action.payload?.data?.count
          state.users = action.payload?.data?.result // Access user property from payload
        }
      }
    )
    builder.addCase(usersAsyncThunk.getAllUsers.rejected, (state) => {
      state.status = RequestStatus.Rejected
    })
  },
})
export const {} = userSlice.actions

export default userSlice.reducer
