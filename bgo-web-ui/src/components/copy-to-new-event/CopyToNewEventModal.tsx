import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

export interface CopyToNewEventModalProps {
  isOpen: boolean
  closeAction: () => void
  sourceEventName: string
  confirmAction?: () => void
}

export default function CopyToNewEvent({
  isOpen,
  closeAction,
  sourceEventName,
  confirmAction = () => {},
}: CopyToNewEventModalProps) {
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [newEventName, setNewEventName] = useState(`Copy of ${sourceEventName}`)
  const [openAfterCreation, setOpenAfterCreation] = useState(true)

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={closeAction}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Copy to new Event?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>New Event Name</FormLabel>
              <Input
                ref={initialRef}
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </FormControl>

            <FormControl mt={4}>
              <Flex gap={2} align={'center'}>
                <Checkbox
                  mb={1.5}
                  isChecked={openAfterCreation}
                  onChange={(e) => setOpenAfterCreation(e.target.checked)}
                />
                <FormLabel>Open after creation?</FormLabel>
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={confirmAction}>
              Create
            </Button>
            <Button onClick={closeAction}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
