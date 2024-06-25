import { Name } from "@/vo/Name"

describe('Name', () => {
  it('should validate a name', () => {
    const output = new Name('John Doe')
    expect(output.getValue()).toBe('John Doe')
  })

  it.each(['John', 'John ', ''])('should return an error if name is invalid', (name) => {
    expect(() => new Name(name)).toThrow('Invalid name')
  })
})