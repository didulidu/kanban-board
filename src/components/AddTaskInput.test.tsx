import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddTaskInput from './AddTaskInput'

describe('AddTaskInput Component', () => {
  it('renders and focuses the input', () => {
    render(<AddTaskInput onSubmit={() => {}} onFocusOut={() => {}} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveFocus()
  })

  it('updates value on change', () => {
    render(<AddTaskInput onSubmit={() => {}} onFocusOut={() => {}} />)
    const input = screen.getByRole('textbox')
    userEvent.type(input, 'New Task')
    expect(input).toHaveValue('New Task')
  })

  it('calls onSubmit on Enter key press', () => {
    const handleSubmit = jest.fn()
    render(<AddTaskInput onSubmit={handleSubmit} onFocusOut={() => {}} />)
    const input = screen.getByRole('textbox')
    userEvent.type(input, 'New Task{enter}')
    expect(handleSubmit).toHaveBeenCalledWith('New Task')
  })

  it('calls onFocusOut on Escape key press', () => {
    const handleFocusOut = jest.fn()
    render(<AddTaskInput onSubmit={() => {}} onFocusOut={handleFocusOut} />)
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' })
    expect(handleFocusOut).toHaveBeenCalled()
  })

  it('calls onFocusOut when blurred with empty value', () => {
    const handleFocusOut = jest.fn()
    render(<AddTaskInput onSubmit={() => {}} onFocusOut={handleFocusOut} />)
    const input = screen.getByRole('textbox')
    userEvent.type(input, '{enter}')
    fireEvent.blur(input)
    expect(handleFocusOut).toHaveBeenCalled()
  })

  it('calls onSubmit when blurred with value', () => {
    const handleSubmit = jest.fn()
    render(<AddTaskInput onSubmit={handleSubmit} onFocusOut={() => {}} />)
    const input = screen.getByRole('textbox')
    userEvent.type(input, 'New Task')
    fireEvent.blur(input)
    expect(handleSubmit).toHaveBeenCalledWith('New Task')
  })
})
