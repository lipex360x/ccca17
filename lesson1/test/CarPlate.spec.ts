import { CarPlate } from "@/vo/CarPlate"

describe('CarPlate', () => {
  it('should validate a car plate', () => {
    const output = new CarPlate('ABC1234')
    expect(output.getValue()).toBe('ABC1234')
  })

  it.each(['ABC123', '123ABC', '1A2B3C4'])('should return an error if car plate is invalid', (carPlate) => {
    expect(() => new CarPlate(carPlate)).toThrow('Invalid car plate')
  })
})