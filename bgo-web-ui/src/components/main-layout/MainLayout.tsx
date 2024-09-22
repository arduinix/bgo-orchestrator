import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";

import Navigation, { LinkItemProps } from "../navigation/Navigation";
import Home from "../../pages/home/Home";

import { LuHome, LuTrees, LuSettings } from "react-icons/lu";

export default function MainLayout() {
  const location = useLocation();

  const linkItems: Array<LinkItemProps> = [
    { name: "Home", icon: LuHome, href: "/" },
    {
      name: "Ecosystems",
      icon: LuTrees,
      href: "/ecosystems",
      tooltip: "Create new eco systems or manage existing ones.",
    },
    {
      name: "Settings",
      icon: LuSettings,
      href: "/settings",
      tooltip: "Modify system and experience settings.",
    },
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
