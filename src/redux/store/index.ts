import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { persistStore } from "redux-persist"
import rootReducers from "../slices/index"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whiteList: ["auth"],
}
export const persistedReducer = persistReducer(persistConfig, rootReducers)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
  // middleware: () => [thunk],
})
export const persistor = persistStore(store)
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof store | any>
export type AppPersistor = ReturnType<typeof persistor | any>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStore,
  unknown,
  Action<string>
>
