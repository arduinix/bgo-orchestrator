import {
  Box,
  Flex,
  FlexProps,
  Icon,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string | (() => void);
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  href: string | (() => void);
}

export interface NavigationProps {
  linkItems: Array<LinkItemProps>;
}

export default function Navigation({ linkItems }: NavigationProps) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <Box
        pt={3}
        pr={3}
        w="20%"
      >
        {linkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {isLargerThan768 && (
              <Text fontSize={"lg"} fontWeight={"bold"}>
                {link.name}
              </Text>
            )}
          </NavItem>
        ))}
      </Box>
    </>
  );
}

const NavItem = ({ icon, href, children }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={typeof href === "string" ? href : undefined}
      onClick={typeof href === "function" ? href : undefined}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.400",
          color: "gray.100",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            color="gray.400"
            fontSize="20"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};
