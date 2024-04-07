import { describe, expect, it } from '@jest/globals'
import { moveElement } from '.'

describe('moveElement', () => {
  it('correctly moves an element from one index to another', () => {
    const arr: string[] = ['a', 'b', 'c', 'd']
    const result: string[] = moveElement(arr, 1, 3)
    expect(result).toEqual(['a', 'c', 'd', 'b'])
  })

  it('throws an error for negative start index', () => {
    const arr: string[] = ['a', 'b', 'c', 'd']
    expect(() => moveElement(arr, -1, 2)).toThrow(
      'Start or end index is out of bounds'
    )
  })

  it('correctly reorders the array when an element is moved backward', () => {
    const arr: string[] = ['a', 'b', 'c', 'd']
    const result: string[] = moveElement(arr, 2, 0)
    expect(result).toEqual(['c', 'a', 'b', 'd'])
  })

  it('handles an array with only one element', () => {
    const arr: string[] = ['a']
    const result: string[] = moveElement(arr, 0, 0)
    expect(result).toEqual(['a'])
  })

  it('throws an error for an empty array', () => {
    const arr: string[] = []
    expect(() => moveElement(arr, 0, 1)).toThrow(
      'Start or end index is out of bounds'
    )
  })
})
