import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {api} from "src/api/api";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  // mainReducer,
  // searchParametersReducer
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']