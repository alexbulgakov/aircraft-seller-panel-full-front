import { useEffect, useState } from 'react'

import { SearchIcon } from '@chakra-ui/icons'
import { Button, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

export function SearchAircraft({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string
  onSearchChange: (query: string) => void
}) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  useEffect(() => {
    setLocalSearchQuery(searchQuery)
  }, [searchQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value)
  }

  const handleSearchClick = () => {
    onSearchChange(localSearchQuery)
  }

  const handleResetClick = () => {
    setLocalSearchQuery('')
    onSearchChange('')
  }

  return (
    <HStack gap={2} alignItems="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input value={localSearchQuery} onChange={handleInputChange} type="text" placeholder="Search" />
      </InputGroup>

      <Button onClick={handleSearchClick} colorScheme="blue">
        Search
      </Button>
      <Button onClick={handleResetClick} colorScheme="blue" variant="outline">
        Reset
      </Button>
    </HStack>
  )
}
