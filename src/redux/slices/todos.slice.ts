import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { todosAsyncThunk } from "../asyncThunk/Todos.async";
import { TodoItem } from "../../components/Accordion";



interface TodoState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  allToDos: any;
  count :number
}

const initialState: TodoState = {
  status: "idle",
  allToDos: [],
  count:0
};

const todosSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(todosAsyncThunk.getUserAllTodos.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      todosAsyncThunk.getUserAllTodos.fulfilled,
      (state, action: PayloadAction<{ data: any }>) => {
        state.status = "fulfilled";
        state.count = action.payload.data.count;
        state.allToDos = action.payload.data.result; // Access user property from payload
      }
    );
    builder.addCase(todosAsyncThunk.getUserAllTodos.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
