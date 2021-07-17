import Memory from '.'

describe('Memory', () => {
  describe('constructor', () => {
    describe('when no arguments are passed', () => {
      it('creates a new memory instance with default options', () => {
        const memory = new Memory()
        expect(memory.options).toEqual(Memory.DEFAULT_OPTIONS)
      })
    })

    describe('when only options are passed', () => {
      it('creates a new memory instance with the given options', () => {
        const options = { capacity: 12 }
        const memory = new Memory({ options })
        expect(memory.options).toEqual({
          ...Memory.DEFAULT_OPTIONS,
          ...options,
        })
      })
    })

    describe('when both options and data are passed', () => {
      it('creates a new memory instance with the given arguments', () => {
        const options = { capacity: 1 }
        const data = [{ allocated: false, value: 1 }]

        const memory = new Memory({
          options,
          data,
        })
        expect(memory.options).toEqual({
          ...Memory.DEFAULT_OPTIONS,
          ...options,
        })
        expect(memory.data).toEqual(data)
      })

      describe('and data is not the same size as capacity', () => {
        it('sets the capacity to the data length', () => {
          const options = { capacity: 10 }
          const data = [{ allocated: false, value: 1 }]

          const memory = new Memory({
            options,
            data,
          })
          expect(memory.options.capacity).toEqual(data.length)
        })
      })
    })
  })

  describe('values', () => {
    it("returns an array of the memory's values", () => {
      const data = [
        { allocated: false, value: 1 },
        { allocated: false, value: 2 },
      ]

      const memory = new Memory({
        data,
      })
      expect(memory.values).toEqual(data.map(({ value }) => value))
    })
  })

  describe('set', () => {
    it('returns a new memory instance with that address set to the given value', () => {
      const memory = new Memory({ data: [{ allocated: true, value: null }] })
      const address = 0
      const value = 10

      const result = memory.set(address, value)
      expect(result).not.toBe(memory)
      expect(result.get(address)).toEqual(value)
    })

    describe('when the address is out of bounds', () => {
      it.todo('throws an out of bounds error')
    })

    describe('when the address is not allocated', () => {
      it.todo('throws an invalid memory access error')
    })

    describe('when the unsafe flag is true', () => {
      describe('and the address is not allocated', () => {
        it('sets the value at the address to the given value', () => {
          const memory = new Memory({ options: { capacity: 6, unsafe: true } })
          const address = 2
          const value = 10

          const result = memory.set(address, value)
          expect(result).not.toBe(memory)
          expect(result.get(address)).toEqual(value)
        })
      })
    })
  })

  describe('get', () => {})
  describe('allocate', () => {})
})
