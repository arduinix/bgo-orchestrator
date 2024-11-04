import React, { useState, ReactNode, useEffect } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { BiCollapseHorizontal, BiExpandHorizontal } from 'react-icons/bi'

export interface AccordionItem {
  title: ReactNode
  content: ReactNode
}

export interface ReusableAccordionProps {
  items: AccordionItem[]
}

const CustomAccordionButton: React.FC<{
  children: React.ReactNode
  isExpanded: boolean
  onClick: () => void
}> = ({ children, isExpanded, onClick }) => {
  return (
    <AccordionButton onClick={onClick}>
      <Box as='span' flex='1' textAlign='left'>
        {children}
      </Box>
      <AccordionIcon
        ml={4}
        as={isExpanded ? BiCollapseHorizontal : BiExpandHorizontal}
      />
    </AccordionButton>
  )
}

export default function ReusableAccordion({ items }: ReusableAccordionProps) {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([])
  

  const handleToggle = (index: number) => {
    setExpandedIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    )
  }

  useEffect(() => {
    setExpandedIndices(items.map((_, index) => index))
  }, [items])

  return (
    <Accordion allowMultiple index={expandedIndices}>
      <Flex direction='row'>
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            m={4}
            borderWidth='1px'
            borderColor='gray.300'
            rounded='md'
          >
            <CustomAccordionButton
              isExpanded={expandedIndices.includes(index)}
              onClick={() => handleToggle(index)}
            >
              <Heading size={'md'}>{item.title}</Heading>
            </CustomAccordionButton>

            <AccordionPanel
              pb={4}
              display={expandedIndices.includes(index) ? 'block' : 'none'}
            >
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Flex>
    </Accordion>
  )
}
