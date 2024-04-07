import React, { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import styled from 'styled-components'

const StyledInput = styled.input`
  height: 30px;
  font-size: 20px;
`

interface SearchTasksProps {
  onSearch: (value: string) => void
}

const SearchTasks: React.FC<SearchTasksProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)

  useEffect(() => {
    onSearch(debouncedSearchTerm.trim())
  }, [debouncedSearchTerm])

  return (
    <div>
      <StyledInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default SearchTasks
