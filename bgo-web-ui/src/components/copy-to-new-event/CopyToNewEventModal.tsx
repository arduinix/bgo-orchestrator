import { Button, Text, Input, Flex } from '@chakra-ui/react'
import { Field } from '@components/ui/field'
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogActionTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@components/ui/checkbox'
import { useRef, useState } from 'react'

export interface CopyToNewEventModalProps {
  open: boolean
  setOpen: () => void
  sourceEventName: string
  confirmAction?: () => void
}

export default function CopyToNewEvent({
  open,
  setOpen,
  sourceEventName,
  confirmAction = () => {},
}: CopyToNewEventModalProps) {
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [newEventName, setNewEventName] = useState(`Copy of ${sourceEventName}`)
  const [openAfterCreation, setOpenAfterCreation] = useState(true)

  return (
    <>
      <DialogRoot
        initialFocusEl={() => initialRef.current}
        finalFocusEl={() => finalRef.current}
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Copy to new Event?</DialogTitle>
          </DialogHeader>
          <DialogBody pb={6}>
            <Field>
              <Text>New Event Name</Text>
              <Input
                ref={initialRef}
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </Field>

            <Field mt={4}>
              <Flex gap={2} align={'center'}>
                <Checkbox
                  mb={1.5}
                  checked={openAfterCreation}
                  onCheckedChange={(e) =>
                    setOpenAfterCreation(Boolean(e.checked))
                  }
                />
                <Text>Open after creation?</Text>
              </Flex>
            </Field>
          </DialogBody>

          <DialogFooter>
            <Button colorScheme='blue' mr={3} onClick={confirmAction}>
              Create
            </Button>
            <DialogActionTrigger asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}
