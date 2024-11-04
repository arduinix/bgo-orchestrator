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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <Accordion allowMultiple>
      <Flex direction='row'>
        <Accordion allowMultiple>
          {items.map((item, index) => (
            <AccordionItem key={index}>
              <h2>
                <CustomAccordionButton
                  isExpanded={expandedIndex === index}
                  onClick={() => handleToggle(index)}
                >
                  {item.title}
                </CustomAccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.content}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Accordion>
  )
}
