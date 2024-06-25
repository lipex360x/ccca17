import { Email } from "@/vo/Email"

describe('Email', () => {
  it('should validate a email', () => {
    const output = new Email('jhon@mail.com')
    expect(output.getValue()).toBe('jhon@mail.com')
  })

  it.each(['jhon@', 'john', ''])('should return an error if email is invalid', (email) => {
    expect(() => new Email(email)).toThrow('Invalid email')
  })
})