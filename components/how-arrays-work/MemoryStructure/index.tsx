import { styled, keyframes } from '@stitches/react'

import { ArrayList, ArrayListItem } from '../ArrayList'
import { range } from '@/lib/utils'

const ITEM_LENGTH = 7

const items = range(ITEM_LENGTH)
const highlightIndex = Math.floor(ITEM_LENGTH / 2)

export function MemoryStructure() {
  return (
    <WrapperList>
      {items.map((item, index) => {
        return <ItemWithIndex key={item} index={index} />
      })}
    </WrapperList>
  )
}

const WrapperList = styled(ArrayList, {
  marginTop: '1.5em',
})

// --

function ItemWithIndex({ index }) {
  return (
    <Wrapper active={index === highlightIndex}>
      <ArrayListItem variant="free" />
      <Index>{index}</Index>
    </Wrapper>
  )
}

const fadeUp = keyframes({
  '0%': {
    transform: 'translateY(16px)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: 1,
  },
})

const slideCenter = keyframes({
  '0%': {
    transform: 'scaleX(0)',
  },
  '100%': {
    transform: 'scaleX(1)',
  },
})

const Wrapper = styled('div', {
  position: 'relative',
  variants: {
    active: {
      true: {
        '&:before': {
          content: '',
          position: 'absolute',
          width: '100%',
          height: '2px',
          top: '-16px',
          background: 'var(--gray400)',
          transformOrigin: 'center',
          animationName: `${slideCenter}`,
          animationDuration: '600ms',
          animationFillMode: 'forwards',
          transform: 'scaleX(0)',
        },
        '&:after': {
          content: '1 byte',
          position: 'absolute',
          width: '100%',
          top: '-44px',
          color: 'var(--gray600)',
          textAlign: 'center',
          fontWeight: 'bold',
          animationName: `${fadeUp}`,
          animationDuration: '600ms',
          animationFillMode: 'forwards',
          animationDelay: '400ms',
          opacity: 0,
          transform: `translateY(16px)`,
        },
      },
    },
  },
})

const Index = styled('div', {
  textAlign: 'center',
  marginTop: '12px',
  color: 'var(--gray600)',
  fontFamily: 'var(--text-mono)',
})