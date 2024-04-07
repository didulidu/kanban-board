import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface SearchState {
  searchTerm: string
}

const initialState: SearchState = {
  searchTerm: '',
}

const searchSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
  },
})

export const selectSearchTerm = (state: RootState) => state.search.searchTerm

export const { setSearch } = searchSlice.actions
export default searchSlice.reducer
