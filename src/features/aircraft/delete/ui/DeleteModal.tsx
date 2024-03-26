import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

export function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  name,
}: {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  name: string
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) hue-rotate(90deg)" />
      <ModalContent>
        <ModalHeader>Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete {name}?</ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onDelete}>
            Yes
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
