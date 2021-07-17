import React from 'react'
import produce from 'immer'

export type Value = number | string | boolean

export type Byte = {
  allocated: boolean
  value: Value
}

type Address = number | null

type MemoryOptions = {
  /**
   * Determines whether allocation checks should be performed on read/writes.
   */
  unsafe: boolean
  capacity: number
}

type MemoryParameters = {
  options: Partial<MemoryOptions>
  values: Value[]
  data: Byte[]
}

const DEFAULT_OPTIONS: MemoryOptions = {
  unsafe: false,
  capacity: 18,
}

function toByteArray(values: Value[]): Byte[] {
  return values.map((value) => ({ allocated: false, value }))
}

export default class Memory {
  data: Byte[]
  options: MemoryOptions

  static DEFAULT_OPTIONS: MemoryOptions = DEFAULT_OPTIONS

  static from(values: Value[]): Memory {
    return new Memory({ data: toByteArray(values) })
  }

  /**
   * Is options.capacity needed? If it is, what to do if data.length
   * is a different length than the given capacity?
   *  - Maybe what makes the most sense here is to set the capacity to
   *    always be the capacity of the given data. If data is not passed,
   *    THEN the capacity is set to whatever is in options.
   *  - Does this make sense from a usage standpoint though?
   */
  constructor({
    options = DEFAULT_OPTIONS,
    data = toByteArray(Array.from({ length: options.capacity })),
  }: Partial<MemoryParameters> = {}) {
    options.capacity = data.length
    this.data = data
    this.options = { ...DEFAULT_OPTIONS, ...options }
  }

  get values() {
    return this.data.map(({ value }) => value)
  }

  set(address: number, value: Value) {
    // TODO: Check if allocated
    // TODO: Check if address is in capacity
    const data = produce(this.data, (draft) => {
      draft[address].value = value
    })
    return new Memory({ data, options: this.options })
  }

  get(address: number) {
    return this.data[address].value
  }

  /**
   * Tries to allocate a space of size `bytes` to memory, returning a [number, Memory]
   * pair if a space was found or a [null, Memory] pair otherwise.
   * @param bytes — the size to allocate
   * @returns a [pointer, Memory] pair
   */
  allocate(bytes: number): [Address, Memory] {
    const startAddress = this.findFreeSpace(bytes)
    if (startAddress) {
      return [
        startAddress,
        new Memory({
          data: this.allocateBytes(startAddress, bytes),
        }),
      ]
    }
    return [null, this]
  }

  private findFreeSpace(size: number): Address {
    for (let address = 0; address < this.data.length - size; address++) {
      const slice = this.data.slice(address, address + size)
      if (slice.every((byte) => !byte.allocated)) {
        return address
      }
    }
    return null
  }

  private allocateBytes(start: number, size: number) {
    return produce(this.data, (data) => {
      for (let i = 0; i < size; i++) {
        const byte = data[start + i]
        byte.allocated = true
      }
    })
  }
}

export function useMemory(values: Value[]) {
  const [memory, setMemory] = React.useState<Memory>(Memory.from(values))
  return {
    values: memory.values,
    set(address: number, value: number) {
      setMemory(memory.set(address, value))
    },
    get(address: number) {
      return memory.get(address)
    },
  }
}
