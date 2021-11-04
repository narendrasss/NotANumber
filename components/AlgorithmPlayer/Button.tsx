import { motion } from 'framer-motion'
import { styled } from '@/stitches'

export const Button = styled(motion.button, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '$8',
  height: '$8',
  fontWeight: 600,
  borderRadius: 6,
  background: '$grey100',

  '&:focus': {
    outline: 'none',
    background: 'hsl(13, 16%, 40%)',
    color: '$white',
  },
})
