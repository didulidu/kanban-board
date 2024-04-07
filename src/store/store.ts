import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import taskReducer from './taskSlice'
import searchSlice from './searchSlice'

const rootReducer = combineReducers({
  tasks: taskReducer,
  search: searchSlice,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tasks'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
