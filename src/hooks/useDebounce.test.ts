import { renderHook, act } from '@testing-library/react'
import useDebounce from './useDebounce'

describe('useDebounce hook', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })
  it('should return the same value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500))

    expect(result.current).toBe('test')
  })

  it('should not update the debounced value before the delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'initial' },
      }
    )

    rerender({ value: 'updated' })

    act(() => {
      jest.advanceTimersByTime(499)
    })

    expect(result.current).toBe('initial')
  })

  it('should update the debounced value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'initial' },
      }
    )

    rerender({ value: 'updated' })

    act(() => {
      jest.advanceTimersByTime(600)
    })

    expect(result.current).toBe('updated')
  })

  it('should handle quick successive changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: 'first' },
      }
    )

    rerender({ value: 'second' })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    rerender({ value: 'final' })
    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current).toBe('first')

    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(result.current).toBe('final')
  })

  afterEach(() => {
    jest.useRealTimers()
  })
})
