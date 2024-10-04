import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface ConfirmActionModalProps {
  isOpen: boolean
  closeAction: () => void
  header?: string | ReactNode
  body?: string | ReactNode
  confirmAction?: () => void
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonColor?: string
  backgroundColor?: string
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
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
  size = 'md',
  backgroundColor = useColorModeValue('white', 'gray.800'),
}: ConfirmActionModalProps) {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={closeAction}
        size={size}
      >
        <ModalOverlay />
        <ModalContent backgroundColor={backgroundColor}>
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
