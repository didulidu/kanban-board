import { configureStore } from '@reduxjs/toolkit'
import searchReducer, {
  setSearch,
  selectSearchTerm,
  SearchState,
} from './searchSlice'
import { RootState } from './store'

describe('searchSlice', () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({ reducer: { search: searchReducer } })
  })

  it('should update searchTerm on setSearch action', () => {
    const newSearchTerm = 'react'

    store.dispatch(setSearch(newSearchTerm))
    const state = store.getState() as RootState

    expect(state.search.searchTerm).toEqual(newSearchTerm)
  })

  it('should select the correct searchTerm from the state', () => {
    const initialState = {
      search: {
        searchTerm: 'initial',
      },
    }

    const predefinedStore = configureStore({
      reducer: { search: searchReducer },
      preloadedState: initialState,
    })

    const selectedSearchTerm = selectSearchTerm(
      predefinedStore.getState() as RootState
    )

    expect(selectedSearchTerm).toEqual(initialState.search.searchTerm)
  })
})
