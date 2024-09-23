import { Box, useColorModeValue, Tooltip, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export interface NavLinkProps {
  name: string;
  href: string | (() => void);
  tooltip?: string;
}
export interface NavLinkItems {
  navLinks: Array<NavLinkProps>;
}

const NavLink = ({ name, href, tooltip }: NavLinkProps) => {
  const location = useLocation();
  const isActive =
    typeof href === "string" && location.pathname.startsWith(href);
  const hoverBg = useColorModeValue("gray.300", "gray.700");

  return (
    <Tooltip label={tooltip} aria-label={tooltip}>
      <Box
        as="a"
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "underline",
          bg: hoverBg,
        }}
        bg={isActive ? hoverBg : undefined}
        textDecoration={isActive ? "underline" : "none"}
        href={typeof href === "string" ? href : undefined}
      >
        <Text fontSize={"xl"}>{name}</Text>
      </Box>
    </Tooltip>
  );
};

const NavLinks = ({ navLinks }: NavLinkItems) => {
  return (
    <>
      {navLinks.map(({ href, tooltip, name }) => (
        <NavLink name={name} href={href} tooltip={tooltip} />
      ))}
    </>
  );
};

export default NavLinks;
