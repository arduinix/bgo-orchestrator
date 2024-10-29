import { Button } from '@chakra-ui/react'
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
import { ReactNode } from 'react'

export interface ConfirmActionModalProps {
  open: boolean
  setOpen: () => void
  header?: string | ReactNode
  body?: string | ReactNode
  confirmAction?: () => void
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonColor?: string
  backgroundColor?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'cover' | 'full'
}

export default function ConfirmActionModal({
  open,
  setOpen,
  header = 'Confirm',
  body = 'Are you sure you want to perform this action?',
  confirmAction = () => {},
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  confirmButtonColor = 'red',
  size = 'md',
  backgroundColor = 'white',
}: ConfirmActionModalProps) {
  return (
    <>
      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)} size={size}>
        <DialogContent backgroundColor={backgroundColor}>
          <DialogHeader>
            <DialogTitle>{header}</DialogTitle>
          </DialogHeader>
          <DialogBody pb={0}>{body}</DialogBody>
          <DialogFooter>
            <Button
              colorScheme={confirmButtonColor}
              mr={3}
              onClick={confirmAction}
            >
              {confirmButtonText}
            </Button>
            <DialogActionTrigger asChild>
              <Button variant='outline'>{cancelButtonText}</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}
