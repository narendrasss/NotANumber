import React from 'react'

import { styled } from '@/stitches'
import { getRandomInt } from '@/lib/utils'
import Spacer from '@/components/utils/Spacer'

import ArrayArrows from './shared/ArrayArrows'
import Button from './shared/Button'

const MEMORY = [62, 12, null, false, null, 'w', 'o', 'r', 'l', 'd']

export default function WriteMemory() {
  const [activeAddress, setActiveAddress] = React.useState(2)
  return (
    <Spacer space="48px">
      <Controls>
        <Text>
          <span>Mem.set(</span>
        </Text>
        <Button
          flat
          type="small"
          onClick={() =>
            setActiveAddress(getRandomInt(0, MEMORY.length - 1, activeAddress))
          }
        >
          address: {activeAddress}
        </Button>
        <Text>
          <span>, </span>
        </Text>
        <Button
          flat
          type="small"
          onClick={() =>
            setActiveAddress(getRandomInt(0, MEMORY.length - 1, activeAddress))
          }
        >
          value: {activeAddress}
        </Button>
        <Text>
          <span>)</span>
        </Text>
      </Controls>
      <ArrayArrows arr={MEMORY} activeIndex={activeAddress} />
    </Spacer>
  )
}

const Controls = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Text = styled('p', {
  fontFamily: 'var(--text-mono)',
  fontSize: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})
