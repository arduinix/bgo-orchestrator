import React, { useState, ReactNode } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
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

  return (
    <Accordion allowMultiple>
      <Flex direction='row'>
        {items.map((item, index) => (
          <AccordionItem key={index}>
            <h2>
              <CustomAccordionButton
                isExpanded={expandedIndices.includes(index)}
                onClick={() => handleToggle(index)}
              >
                {item.title}
              </CustomAccordionButton>
            </h2>
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
