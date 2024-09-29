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

export interface ConfirmActionModalProps {
  isOpen: boolean
  closeAction: () => void
  header?: string
  body?: string
  confirmAction?: () => void
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonColor?: string
}

export default function ConfirmActionModal({
  isOpen,
  closeAction,
  header = 'Confirm',
  body = 'Are you sure you want to perform this action?',
  confirmAction = () => {},
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  confirmButtonColor = 'red',
}: ConfirmActionModalProps) {
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeAction}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{body}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme={confirmButtonColor}
              mr={3}
              onClick={confirmAction}
            >
              {confirmButtonText}
            </Button>
            <Button onClick={closeAction}>{cancelButtonText}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
