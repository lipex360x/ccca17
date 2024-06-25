import { Account } from "@/entity/Account"

describe('Driver', () => {
  it('should create a driver', () => {
    const inputAccount = {
      name: 'Jonh Doe',
      email: 'john@mail.com',
      cpf: '87748248800',
      carPlate: 'ABC1234',
      isPassenger: false,
      isDriver: true,
      password: 'abc1234'
    }

    const outputAccount = Account.create(inputAccount.name, inputAccount.email, inputAccount.cpf, inputAccount.carPlate, inputAccount.isPassenger, inputAccount.isDriver, inputAccount.password)
    expect(outputAccount.accountId).toBeDefined()
  })

  it('should create a Passenger', () => {
    const inputAccount = {
      name: 'Jonh Doe',
      email: 'john@mail.com',
      cpf: '87748248800',
      carPlate: '',
      isPassenger: true,
      isDriver: false,
      password: 'abc1234'
    }

    const outputAccount = Account.create(inputAccount.name, inputAccount.email, inputAccount.cpf, inputAccount.carPlate, inputAccount.isPassenger, inputAccount.isDriver, inputAccount.password)
    expect(outputAccount.accountId).toBeDefined()
  })

  it('should restore a account', () => {
    const inputAccount = {
      accountId: 'accountId',
      name: 'Jonh Doe',
      email: 'john@mail.com',
      cpf: '87748248800',
      carPlate: 'ABC1234',
      isPassenger: false,
      isDriver: true,
      password: 'abc1234'
    }

    const outputAccount = Account.restore(inputAccount.accountId,inputAccount.name, inputAccount.email, inputAccount.cpf, inputAccount.carPlate, inputAccount.isPassenger, inputAccount.isDriver, inputAccount.password)
    expect(outputAccount.accountId).toBe('accountId')
  })
})