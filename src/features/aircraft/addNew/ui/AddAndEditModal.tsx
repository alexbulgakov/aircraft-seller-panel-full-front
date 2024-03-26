import { useEffect, useState } from 'react'

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'

import { useAppSelector } from '@/app/hooks'
import { AircraftType, validationSchema } from '@/entities/aircraft'
import { formatToUSDCurrency } from '@/shared/lib'

export function AddAndEditModal({
  isOpen,
  onClose,
  type,
  onSubmitFunc,
  id = 0,
}: {
  isOpen: boolean
  onClose: () => void
  type: string
  onSubmitFunc: (aircraft: AircraftType) => void
  id?: number
}) {
  const [displayValue, setDisplayValue] = useState('')

  const aircraft = useAppSelector(state => state.aircraft.data.find(aircraft => aircraft.id === id))

  const initialValues = aircraft
    ? {
        name: aircraft.name,
        supplierEmail: aircraft.supplierEmail,
        count: aircraft.count ? aircraft.count.toString() : '',
        price: aircraft.price ? aircraft.price.toString() : '',
      }
    : {
        name: '',
        supplierEmail: '',
        count: '',
        price: '',
      }

  useEffect(() => {
    if (aircraft?.name) {
      if (aircraft.price) {
        setDisplayValue(formatToUSDCurrency(Number(aircraft.price)))
      }
    }
  }, [aircraft])

  return (
    <Modal
      isCentered
      size="md"
      isOpen={isOpen}
      onClose={() => {
        onClose()
        setDisplayValue('')
      }}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) " />
      <ModalContent>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            onSubmitFunc({
              id: type !== 'add' ? id : Date.now(),
              name: values.name,
              supplierEmail: values.supplierEmail,
              count: Number(values.count),
              price: Number(values.price),
            })
            setDisplayValue('')
          }}
          validateOnBlur={true}
          validateOnChange={false}>
          {({ values, handleChange, handleBlur, touched, errors, setFieldValue, setFieldError }) => (
            <Form autoComplete="off">
              <ModalBody mt={8} display="flex" flexDirection="column" gap={5}>
                <FormControl isInvalid={!!errors.name && touched.name} minH="100px">
                  <FormLabel htmlFor="name">Name:</FormLabel>
                  <Input
                    maxW="250px"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={e => {
                      setFieldError('name', '')
                      handleChange(e)
                    }}
                    onBlur={e => {
                      handleBlur(e)
                    }}
                    type="text"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.supplierEmail && touched.supplierEmail} minH="100px">
                  <FormLabel htmlFor="supplierEmail">Supplier email:</FormLabel>
                  <Input
                    maxW="250px"
                    id="supplierEmail"
                    name="supplierEmail"
                    value={values.supplierEmail}
                    onChange={e => {
                      setFieldError('supplierEmail', '')
                      handleChange(e)
                    }}
                    onBlur={e => {
                      handleBlur(e)
                    }}
                    type="email"
                  />
                  <FormErrorMessage>{errors.supplierEmail}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.count && touched.count} minH="100px">
                  <FormLabel htmlFor="count">Count:</FormLabel>
                  <Input
                    maxW="250px"
                    id="count"
                    name="count"
                    value={values.count}
                    onChange={e => {
                      setFieldError('count', '')
                      handleChange(e)
                    }}
                    onBlur={e => {
                      handleBlur(e)
                    }}
                    type="number"
                  />
                  <FormErrorMessage>{errors.count}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.price && touched.price} minH="100px">
                  <FormLabel htmlFor="price">Price:</FormLabel>
                  <Input
                    maxW="250px"
                    id="price"
                    name="price"
                    value={displayValue}
                    onFocus={() => setDisplayValue(values.price)}
                    onChange={e => {
                      setFieldError('price', '')
                      setDisplayValue(e.target.value)
                      handleChange(e)
                    }}
                    onBlur={e => {
                      const numValue = Number(e.target.value)

                      if (!isNaN(numValue) && numValue > 0) {
                        const formattedValue = formatToUSDCurrency(numValue)
                        setFieldValue('price', numValue)
                        setDisplayValue(formattedValue)
                      }
                      handleBlur(e)
                    }}
                    type="text"
                  />
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter justifyContent="start">
                <Button colorScheme="blue" mr={3} type="submit">
                  {type === 'add' ? 'Add' : 'Update'}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}
