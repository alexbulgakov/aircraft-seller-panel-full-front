import { useState } from 'react'

import { useToast } from '@chakra-ui/toast'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ActionButtons, AircraftType } from '@/entities/aircraft'
import { removeAircraft, editAircraft } from '@/entities/aircraft/model/slice'
import { AddAndEditModal, DeleteModal } from '@/features/aircraft/delete'
import { api } from '@/shared/api'

export function Actions({ id }: { id: number }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const dispatch = useAppDispatch()
  const toast = useToast()
  const aircraft = useAppSelector(state => state.aircraft.data.find(aircraft => aircraft.id === id))

  const onOpenDelete = () => setIsDeleteOpen(true)

  const onCloseDelete = () => setIsDeleteOpen(false)

  const onOpenEdit = () => setIsEditOpen(true)

  const onCloseEdit = () => setIsEditOpen(false)

  const onEdit = (aircraft: AircraftType) => {
    api
      .editProduct(aircraft)
      .then(response => {
        console.log(response)
        if (response.success) {
          // @ts-expect-error error exists
          if (response.id?.error) {
            throw new Error()
          } else {
            dispatch(editAircraft(aircraft))
            onCloseEdit()
            toast({
              title: 'Success',
              description: "You've successfully edited an aircraft",
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top',
            })
          }
        } else {
          throw new Error('Edit error')
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

  const onDelete = (id: number) => {
    api
      .deleteProduct(id)
      .then(data => {
        if (data.success) {
          dispatch(removeAircraft(id))
          onCloseDelete()
          toast({
            title: 'Success',
            description: "You've successfully deleted an aircraft",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        } else {
          throw new Error('Delete failed')
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
      <ActionButtons onOpenDelete={onOpenDelete} onOpenEdit={onOpenEdit} />
      <AddAndEditModal isOpen={isEditOpen} onClose={onCloseEdit} type="edit" onSubmitFunc={onEdit} id={id} />
      <DeleteModal
        name={aircraft?.name ? aircraft.name : ''}
        isOpen={isDeleteOpen}
        onClose={onCloseDelete}
        onDelete={() => onDelete(id)}
      />
    </>
  )
}
