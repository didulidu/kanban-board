import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'

interface AddTaskInputProps {
  onSubmit: (value: string) => void
  onFocusOut: () => void
}

const StyledInput = styled.textarea`
  padding: 20px;
  margin-bottom: 10px;
  width: 130px;
  min-height: 130px;
  background-color: lightgreen;
  text-align: center;
  font-size: 20px;
  overflow: scroll;
  cursor: pointer;
  word-break: break-word;

  @media (max-width: 768px) {
    width: 90px;
  }
`

const AddTaskInput: FC<AddTaskInputProps> = ({ onSubmit, onFocusOut }) => {
  const [value, setValue] = useState('')

  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
    },
    [value]
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit(value)
    }

    if (event.key === 'Escape' && !event.shiftKey) {
      event.preventDefault()
      onFocusOut()
    }
  }

  const handleBlur = () => {
    if (value === '') {
      onFocusOut()
      return
    }
    onSubmit(value)
  }

  return (
    <StyledInput
      onBlur={handleBlur}
      ref={inputRef}
      onChange={handleChange}
      value={value}
      onKeyDown={handleKeyDown}
    />
  )
}

export default AddTaskInput
