import { Box, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Navigation, { LinkItemProps } from "../navigation/Navigation";
import Home from "../../pages/home/Home";
import Header from "../header/Header";
import ContactModal from "../contact-modal/ContactModal";
import {
  PiHouseLight,
  PiListChecksLight,
  PiMessengerLogoLight,
  PiQuestionLight,
} from "react-icons/pi";
import { axiosClient } from "../../lib/auth/AxiosClient";
import { Contact } from "../../types";

export default function MainLayout() {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [contact, setContact] = useState<Contact>({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const linkItems: Array<LinkItemProps> = [
    { name: "Home", icon: PiHouseLight, href: "/" },
    { name: "My Olympics", icon: PiQuestionLight, href: "/myolympics" },
  ];

  const onSend = async () => {
    onClose();
    try {
      await axiosClient.post("/message", {
        message: {
          name: contact.name,
          subject: contact.subject,
          email: contact.email,
          message: contact.message,
        },
      });
      toast({
        title: "Message Sent!",
        description: "Nick will get back to you soon!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setContact({ name: "", subject: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while sending the message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box position={"relative"} minHeight={"100vh"}>
      <ContactModal
        isOpen={isOpen}
        onClose={onClose}
        onSend={onSend}
        contact={contact}
        setContact={setContact}
      />
      <Flex
        direction="column"
        position="absolute"
        width="100%"
        height="100%"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Header />
        <Flex overflow="scroll">
          <Navigation linkItems={linkItems} />
          <Box p={4} w="100%" flexGrow={1} overflow="scroll">
            {location.pathname === "/" ? <Home /> : <Outlet />}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
