import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation, { LinkItemProps } from "../navigation/Navigation";
import Home from "../../pages/home/Home";
import Header from "../header/Header";
import {
  PiHouseLight,
  PiQuestionLight,
} from "react-icons/pi";

export default function MainLayout() {
  const location = useLocation();

  const linkItems: Array<LinkItemProps> = [
    { name: "Home", icon: PiHouseLight, href: "/" },
    { name: "My Olympics", icon: PiQuestionLight, href: "/myolympics" },
  ];

  return (
    <Box position={"relative"} minHeight={"100vh"}>
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
