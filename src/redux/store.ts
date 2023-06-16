import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './API/API'
import productReducer from './slices/productSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    product: productReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)