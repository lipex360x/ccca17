import { Id } from "@/vo/Id"

describe('Id', () => {
  it('should create a id', () => {
    expect(new Id().getValue()).not.toBeNull()
  })
})