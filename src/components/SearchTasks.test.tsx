import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchTasks from './SearchTasks'

describe('SearchTasks Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('renders correctly', () => {
    render(<SearchTasks onSearch={() => {}} />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('updates searchTerm state on user input', () => {
    render(<SearchTasks onSearch={() => {}} />)
    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'task' } })
    expect(input).toHaveValue('task')
  })

  afterEach(() => {
    jest.useRealTimers()
  })
})
