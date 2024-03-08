import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { todosAsyncThunk } from "../asyncThunk/Todos.async"
import { RequestStatus } from "../../utils/constants"

interface TodoState {
  status:
    | RequestStatus.Idle
    | RequestStatus.Pending
    | RequestStatus.Fulfilled
    | RequestStatus.Rejected
  allToDos: any
  count: number
}

const initialState: TodoState = {
  status: RequestStatus.Idle,
  allToDos: [],
  count: 0,
}

const todosSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(todosAsyncThunk.getAllTodosAsyncThunk.pending, (state) => {
      state.status = RequestStatus.Pending
    })
    builder.addCase(
      todosAsyncThunk.getAllTodosAsyncThunk.fulfilled,
      (state, action: PayloadAction<{ data: any }>) => {
        if (action.payload) {
          state.status = RequestStatus.Fulfilled
          state.count = action.payload.data?.count
          state.allToDos = action.payload.data?.result // Access user property from payload
        } else {
          // Handle the case where action.payload is undefined
          return
        }
      }
    )

    builder.addCase(todosAsyncThunk.getAllTodosAsyncThunk.rejected, (state) => {
      state.status = RequestStatus.Rejected
    })
  },
})

export const {} = todosSlice.actions
export default todosSlice.reducer
