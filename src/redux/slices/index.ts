import { combineReducers } from "@reduxjs/toolkit";
import todosSlice from "./todos.slice";
import authSlice from "./auth.slice";
import uimodeSlice from "./uimode.slice";
export default combineReducers({
  todos: todosSlice,
  auth: authSlice,
  uimode:uimodeSlice
});
