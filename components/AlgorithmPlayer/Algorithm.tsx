import React from 'react'
import { HiArrowLeft, HiArrowRight, HiPencil, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

import { styled } from '@/stitches'
import exec from '@/lib/exec'
import { zip } from '@/lib/utils'
import usePlayer from '@/lib/usePlayer'

import { Button } from './Button'
import { PlayButton } from './PlayButton'
import { SaveFormButton } from './SaveFormButton'
import { AnimationWrapper } from './AnimationWrapper'

export function Algorithm({
  algorithm,
  children,
  initialInputs = [],
  controls = false,
  editable = false,
  delay = 400,
}) {
  if (!Array.isArray(algorithm)) {
    algorithm = [algorithm]
  }
  let { params } = algorithm[0]
  params = JSON.parse(params)

  const [showForm, toggle] = React.useReducer((show) => !show, false)
  const [inputs, setInputs] = React.useState(initialInputs)
  const [errors, setErrors] = React.useState({})
  const formRef = React.useRef<HTMLFormElement>()

  const steps = React.useMemo(
    () => zip(...algorithm.map(({ entryPoint }) => exec(entryPoint, inputs))),
    [algorithm, inputs]
  )

  const playerContext = usePlayer<any[]>(steps, { delay })
  const { activeStepIndex, state, isPlaying } = playerContext.models

  const isDone = state.every((subState) => subState.__done)

  const handleSubmit = (form: HTMLFormElement) => {
    const entries = [...new FormData(form).entries()]
    if (entries.every(validate)) {
      playerContext.actions.reset()
      setInputs(entries.map(([, value]) => JSON.parse(value as string)))
    }
  }

  const validate = ([name, value]) => {
    try {
      JSON.parse(value)
      setErrors({ ...errors, [name]: null })
      return true
    } catch (err) {
      setErrors({ ...errors, [name]: `Please enter a serializable value.` })
      return false
    }
  }

  return (
    <>
      <AnimationWrapper
        player={playerContext}
        controls={controls}
        editable={editable}
        showForm={showForm}
        onSubmitForm={() => {
          handleSubmit(formRef.current)
          toggle()
        }}
        onShowForm={toggle}
      >
        {children({ state: algorithm.length > 1 ? state : state[0], inputs })}
      </AnimationWrapper>
      {showForm && (
        <Form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault()
            handleSubmit(evt.target as HTMLFormElement)
          }}
          variants={{
            show: {
              y: 0,
              opacity: 1,
            },
            hide: {
              y: '-100%',
              opacity: 0,
            },
          }}
          initial="hide"
          animate="show"
        >
          {params
            .map((name: string, index: number) => [name, inputs[index]])
            .map(([name, value]: [string, string]) => (
              <Label key={name}>
                <Input
                  name={name}
                  type="text"
                  defaultValue={JSON.stringify(value)}
                  onBlur={(evt) => validate([name, evt.target.value])}
                />
                <InputName>{name}</InputName>
                {errors[name] && <p>{errors[name]}</p>}
              </Label>
            ))}
          <button type="submit"></button>
        </Form>
      )}
    </>
  )
}

const InputName = styled('span', {
  display: 'block',
})

const Input = styled('input', {
  $$borderColor: '$colors$grey300',

  width: '100%',
  padding: '$2',
  border: '2px solid $$borderColor',
  borderRadius: 8,

  '&:focus': {
    outline: 'none',
    $$borderColor: '$colors$blue',
  },
})

const Label = styled('label', {
  flex: 1,
  margin: '0 $1',
  fontFamily: '$mono',
})

const Form = styled(motion.form, {
  zIndex: 1,
  display: 'flex',
  width: '100%',
  padding: '0 $8',
  margin: '0 auto',
  marginTop: '$6',

  '@md': {
    width: '75%',
    padding: '0',
  },
})

const StepCounter = styled('p', {
  position: 'absolute',
  color: '$grey600',
  right: '$5',
  top: '$4',
})

const FormControls = styled('div', {
  display: 'flex',
  '> :not(:last-child)': {
    marginRight: '$1',
  },
})

const AlgorithmWrapper = styled('div', {
  zIndex: 0,
})

const ControlsWrapper = styled('div', {
  position: 'absolute',
  left: 0,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0 $4',
  color: '$grey600',
  bottom: '$4',
})

const StepButtons = styled('div', {
  display: 'flex',
})

const Content = styled('div', {
  position: 'relative',
  zIndex: 2,
  padding: '$16 $8',
  background: '$grey200',
  border: '2px solid $grey300',

  '@md': {
    borderRadius: '8px',
  },
})
