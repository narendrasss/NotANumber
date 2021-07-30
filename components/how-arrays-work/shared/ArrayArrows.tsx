import React from 'react'
import { FaLongArrowAltDown } from 'react-icons/fa'
import { motion } from 'framer-motion'

import { styled } from '@/stitches'
import { Value } from '@/lib/memory'

import ArrayElement from './ArrayElement'
import ArrayList from './ArrayList'

type ArrayArrowsProps = {
  arr: Value[]
  activeIndex: number
}

export default function ArrayArrows({ arr, activeIndex }: ArrayArrowsProps) {
  return (
    <ArrayList>
      {arr.map((item, index) => {
        const isActive = activeIndex === index
        return (
          <ElementWrapper key={index}>
            {isActive ? <Pointer /> : null}
            <ArrayElement
              type={isActive ? 'light' : undefined}
              layout="position"
            >
              {item === null ? null : String(item)}
            </ArrayElement>
            <Index layout="position">{index}</Index>
          </ElementWrapper>
        )
      })}
    </ArrayList>
  )
}

const Index = styled(motion.p, {
  textAlign: 'center',
  marginTop: '4px',
})

const ElementWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

// --

function Pointer(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <Highlight {...props}>
      <FaLongArrowAltDown />
    </Highlight>
  )
}

const Highlight = styled('div', {
  color: 'var(--color-dark)',
  textAlign: 'center',
  marginBottom: '4px',
  fontSize: '1.5rem',
})
