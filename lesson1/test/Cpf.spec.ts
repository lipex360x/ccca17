import { Cpf } from "@/vo/Cpf"

describe('Cpf', () => {
  it('should create a cpf without mask', () => {
    const input = {
      cpf: '41553189035',
    }
    const output = new Cpf(input.cpf)
    expect(output.getValue()).toBe('41553189035')
  })

  it('should create a cpf with mask', () => {
    const input = {
      cpf: '415.531.890-35',
    }
    const output = new Cpf(input.cpf)
    expect(output.getValue()).toBe('41553189035')
  })

  it('should return an error if cpf is empty', () => {
    expect(() => new Cpf('')).toThrow(new Error('Invalid CPF'))
  })

  it('should return an error if cpf length is invalid', () => {
    expect(() => new Cpf('41553')).toThrow(new Error('Invalid CPF'))
  })

  it.each(['11111111111', '22222222222'])(
    'should return an error if all digits of the cpf are the same',
    (cpf: string) => {
      expect(() => new Cpf(cpf)).toThrow(new Error('Invalid CPF'))
    },
  )

  it.each(['12345678910', '10987654321'])('should return an error if cpf is invalid', (cpf: string) => {
    expect(() => new Cpf(cpf)).toThrow(new Error('Invalid CPF'))
  })
})