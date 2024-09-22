import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Contact } from "../../types";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
}

export default function ContactModal({
  isOpen,
  onClose,
  onSend,
  contact,
  setContact,
}: ContactModalProps) {
  
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isEmailValid, setEmailValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(contact.email));
  }, [contact.email]);

  useEffect(() => {
    if (contact.name && contact.subject && isEmailValid && contact.message) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [contact.name, contact.subject, isEmailValid, contact.message]);

  const handleClose = () => {
    setContact({ name: "", subject: "", email: "", message: "" });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContact((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Nick a Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="What's your name?"
                maxLength={50}
                value={contact.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Subject</FormLabel>
              <Input
                name="subject"
                placeholder="What are you messaging about?"
                maxLength={50}
                value={contact.subject}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              mt={4}
              isInvalid={!isEmailValid && contact.email !== ""}
            >
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                placeholder="who@where.com"
                maxLength={50}
                value={contact.email}
                onChange={handleChange}
              />
              <FormErrorMessage>
                Please enter a valid email address.
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Elaborate</FormLabel>
              <Textarea
                name="message"
                placeholder="Tell me more."
                maxLength={500}
                value={contact.message}
                onChange={handleChange}
              />
            </FormControl>
            <Text mt={4}>Looking forward to hearing from you!</Text>
          </ModalBody>
          <ModalFooter>
            <Tooltip
              label={
                isButtonDisabled
                  ? "Sorry, but you need to fill out all of the fields first."
                  : null
              }
            >
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onSend}
                isDisabled={isButtonDisabled}
              >
                Send it!
              </Button>
            </Tooltip>
            <Button onClick={handleClose}>Forget It</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
