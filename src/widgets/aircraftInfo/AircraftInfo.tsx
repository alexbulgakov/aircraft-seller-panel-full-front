import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Th,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'

import { AircraftType } from '@/entities/aircraft'
import { formatToUSDCurrency } from '@/shared/lib'

export function AircraftInfo({ aircraft }: { aircraft: AircraftType }) {
  const { name, supplierEmail, count, price } = aircraft
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button textDecoration="underline" onClick={onOpen} colorScheme="blue" variant="link">
        {name}
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>Info about {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="unstyled">
                <Tbody>
                  <Tr>
                    <Th>Name:</Th>
                    <Th>{name}</Th>
                  </Tr>
                  <Tr>
                    <Th>Supplier email:</Th>
                    <Th>{supplierEmail ? supplierEmail : '-'}</Th>
                  </Tr>
                  <Tr>
                    <Th>Count:</Th>
                    <Th>{count ? count : '-'}</Th>
                  </Tr>
                  <Tr>
                    <Th>Price:</Th>
                    <Th>{price ? formatToUSDCurrency(Number(price)) : '-'}</Th>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
