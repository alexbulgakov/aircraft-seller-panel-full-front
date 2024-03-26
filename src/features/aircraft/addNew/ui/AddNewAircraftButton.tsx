import { Button, useDisclosure, useToast } from '@chakra-ui/react'

import { AddAndEditModal } from '../../delete'

import { useAppDispatch } from '@/app/hooks'
import { AircraftType } from '@/entities/aircraft'
import { addAircraft } from '@/entities/aircraft/model/slice'
import { api } from '@/shared/api'

export function AddNewAircraftButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useAppDispatch()
  const toast = useToast()

  const addNew = (aircraft: AircraftType) => {
    api
      .addProduct(aircraft)
      .then(response => {
        // @ts-expect-error error exists
        if (response.id?.error) {
          throw new Error()
        } else {
          const addedAircraft = { ...aircraft, id: response.id }
          dispatch(addAircraft(addedAircraft))
          onClose()
          toast({
            title: 'Success',
            description: "You've successfully added a new aircraft",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        }
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      })
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add new
      </Button>
      <AddAndEditModal type="add" isOpen={isOpen} onClose={onClose} onSubmitFunc={addNew} />
    </>
  )
}
