// import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
// import colors from './colors'
// import '@fontsource/ibm-plex-sans'

// const overrides = {
//   colors,
//   styles: {
//     global: {
//       '*': {
//         boxSizing: 'border-box',
//       },
//       'html, body': {
//         fontWeight: 300,
//         fontSize: '14px',
//         margin: 0,
//         minHeight: '100vh',
//       },
//       img: {
//         maxWidth: '100%',
//       },
//     },
//   },
//   components: {
//     Link: {
//       baseStyle: {
//         color: 'black',
//       },
//     },
//     Text,
//     Popover: {
//       variants: {
//         responsive: {
//           popper: {
//             maxWidth: 'unset',
//             width: 'unset',
//           },
//         },
//       },
//     },
//   },
//   fonts: {
//     heading: `'IBM Plex Sans': 'sans-serif'`,
//     body: `'IBM Plex Sans': 'sans-serif'`,
//   },
// }

// const config: ThemeConfig = {
//   initialColorMode: 'light',
//   useSystemColorMode: false,
// }

// export default extendTheme(overrides, { config })

import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'IBM Plex Sans': 'sans-serif'` },
        body: { value: `'IBM Plex Sans': 'sans-serif'` },
      },
    },
  },
})

//TODO: This them may need to be update to support the new chakra-ui version, the currently implemented theme is that minimum.