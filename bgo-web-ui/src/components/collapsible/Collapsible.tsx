// import { useState } from 'react'
// import { Box, Heading, Button, Collapse, VStack } from '@chakra-ui/react'

// export default function Collapsible() {
//   const [showComponent, setShowComponent] = useState(true)

//   return (
//     <VStack spacing={4} align='stretch'>
//       <Box borderWidth='1px' rounded='md' p={4}>
//         <Heading size='md' mb={2}>
//           Component 1
//           <Button
//             size='xs'
//             variant='link'
//             float='right'
//             onClick={() => setShowComponent(!showComponent)}
//           >
//             {showComponent ? 'Collapse' : 'Expand'}
//           </Button>
//         </Heading>
//         <Collapse in={showComponent} animateOpacity>
//           {/* Content of Component 1 */}
//           <Box p={4} bg='gray.100' rounded='md'>
//             This is the content of Component 1.
//           </Box>
//         </Collapse>
//       </Box>
//     </VStack>
//   )
// }

import { useState } from 'react'
import { Box, Heading, Button, Collapse, HStack, Text } from '@chakra-ui/react'

const MyComponent: React.FC = () => {
  const [showComponent, setShowComponent] = useState(true)

  return (
    <HStack spacing={4}>
      <Box borderWidth='1px' rounded='md' p={4} position='relative'>
        <Box mb={2}>
          {showComponent && <Heading size='sm'>Component 1</Heading>}
        </Box>
        <Heading size='md' mb={2}>
          <Button
            size='xs'
            variant='link'
            float='right'
            onClick={() => setShowComponent(!showComponent)}
          >
            {showComponent ? 'Collapse' : 'Expand'}
          </Button>
        </Heading>
        <Collapse in={showComponent} animateOpacity>
          <Box p={4} bg='gray.100' rounded='md'>
            Test content
          </Box>
        </Collapse>
        {!showComponent && (
          <Text
            position='absolute'
            top='100%'
            left='-50px'
            transform='translateY(-50%) rotate(-90deg)'
            whiteSpace='nowrap'
          ></Text>
        )}
      </Box>
    </HStack>
  )
}

export default MyComponent
