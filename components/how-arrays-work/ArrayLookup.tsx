import React from 'react'

import { styled } from '@/stitches'
import { getRandomInt } from '@/lib/utils'
import Spacer from '@/components/utils/Spacer'

import Button from './shared/Button'
import ArrayArrows from './shared/ArrayArrows'

type ArrayLookupProps = {
  arr: number[]
  activeIndex: number
}

export default function ArrayLookup({ arr, activeIndex }: ArrayLookupProps) {
  const [currentIndex, setCurrentIndex] = React.useState(activeIndex)
  return (
    <Spacer space="32px">
      <RandomIndexButton
        onClick={() =>
          setCurrentIndex(getRandomInt(0, arr.length - 1, currentIndex))
        }
      >
        Index: {currentIndex}
      </RandomIndexButton>
      <ArrayArrows arr={arr} activeIndex={currentIndex} />
    </Spacer>
  )
}

const RandomIndexButton = styled(Button, {
  margin: '0 auto',
})
