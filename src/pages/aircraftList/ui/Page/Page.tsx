import { useEffect, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  HStack,
  Heading,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Aircraft } from '@/entities/aircraft'
import { setData } from '@/entities/aircraft/model/slice'
import { AircraftTable } from '@/entities/aircraftTable'
import { AddNewAircraftButton } from '@/features/aircraft/addNew'
import { SearchAircraft } from '@/features/aircraft/search'
import { api } from '@/shared/api'
import { Actions } from '@/widgets/actions'
import { AircraftInfo } from '@/widgets/aircraftInfo'

export function AircraftSellerPage() {
  const dispatch = useAppDispatch()
  const aircraftList = useAppSelector(state => state.aircraft.data)
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  useEffect(() => {
    setLoading(true)
    api
      .getAllProducts()
      .then(data => {
        dispatch(setData(data))
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      toast({
        title: 'Click on the table headers to sort the table',
        status: 'info',
        duration: 7000,
        isClosable: true,
        position: 'top',
      })
    }, 3000)
  }, [])

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const search = query.get('search') || ''
    setSearchQuery(search)
  }, [])

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    if (searchQuery) {
      query.set('search', searchQuery)
    } else {
      query.delete('search')
    }
    navigate(`?${query.toString()}`, { replace: true })
  }, [searchQuery, navigate, location.search])

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : sortOrder === 'asc' ? '' : 'desc')
    } else {
      setSortOrder('desc')
      setSortField(field)
    }
  }

  const getSortedAircraftList = () => {
    if (!sortField || !sortOrder) {
      return aircraftList
    }

    return [...aircraftList].sort((a, b) => {
      // @ts-expect-error list always exists
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1
      // @ts-expect-error list always exists
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }

  const sortedAircraftList = getSortedAircraftList()

  const filteredAircraftList = sortedAircraftList.filter(aircraft =>
    aircraft.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <Box h="100vh" w="100vw" display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box h="100vh" w="100vw" display="flex" justifyContent="center" alignItems="center">
        <Alert maxW="50%" status="error">
          <AlertIcon />
          <AlertTitle>An error occurred - </AlertTitle>
          <AlertDescription>try later or reload the page</AlertDescription>
        </Alert>
      </Box>
    )
  }

  return (
    <Box p={4} display="flex" flexDirection="column" gap={5}>
      <Heading as="h2" size="xl">
        Aircraft Seller Panel
      </Heading>
      <HStack flexWrap="wrap" justifyContent="space-between">
        <SearchAircraft searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <AddNewAircraftButton />
      </HStack>

      <AircraftTable
        isEmpty={aircraftList.length === 0}
        sortOrder={sortOrder}
        sortField={sortField}
        onNameClick={() => handleSortChange('name')}
        onPriceClick={() => handleSortChange('price')}>
        {filteredAircraftList.map(aircraft => (
          <Aircraft
            key={aircraft.id}
            name={<AircraftInfo aircraft={aircraft} />}
            count={aircraft.count ? aircraft.count : 0}
            price={aircraft.price ? Number(aircraft.price) : 0}>
            <Actions id={aircraft.id} />
          </Aircraft>
        ))}
      </AircraftTable>
      {aircraftList.length === 0 && (
        <Alert mt={5} status="warning" variant="subtle" maxW="600px" alignSelf="center" rounded="md">
          <AlertIcon />
          The table is empty. Click &quot;Add new&quot; button to add a new aircraft.
        </Alert>
      )}
      {filteredAircraftList.length === 0 && searchQuery && (
        <Alert mt={5} status="warning" variant="subtle" maxW="600px" alignSelf="center" rounded="md">
          <AlertIcon />
          No results found for &quot;{searchQuery}&quot;.
        </Alert>
      )}
    </Box>
  )
}
