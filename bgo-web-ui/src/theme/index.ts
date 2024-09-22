import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import colors from "./colors";
//import { Button, Input, NavLink, Table, Text } from './components/index'

const overrides = {
  colors,
  styles: {
    global: {
      "*": {
        boxSizing: "border-box",
      },
      "html, body": {
        fontWeight: 300,
        fontSize: "14px",
        margin: 0,
        minHeight: "100vh",
      },
      img: {
        maxWidth: "100%",
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        color: "black",
      },
    },
    Text,
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: "unset",
            width: "unset",
          },
        },
      },
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false ,
};

export default extendTheme(overrides, { config });
