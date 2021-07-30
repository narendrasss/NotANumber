import { styled } from '@/stitches'

export default function Spacer({ space = '0', children }) {
  return (
    <Wrapper style={{ '--space': space } as React.CSSProperties}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  '> * + *': {
    marginTop: 'var(--space, 0)',
    marginBottom: 'var(--space, 0)',
  },
})
