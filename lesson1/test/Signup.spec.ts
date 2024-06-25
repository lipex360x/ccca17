import { PgPromiseAdapter } from "@/adapters/PgPromise.adapter"
import { AccountRepository } from "@/repositories/AccountRepository"
import { AccountRepositoryDatabase } from "@/repositories/database/AccountRepositoryDatabase"
import { AccountRepositoryMemory } from "@/repositories/memory/AccountRepositoryMemory"
import { SignupUseCase } from "@/usecases/Signup.usecase"
import cuid from 'cuid'

let accountRepository: AccountRepository
let connecionAdapter: PgPromiseAdapter

describe('Signup', () => {
  beforeEach(() => {
    connecionAdapter = new PgPromiseAdapter()
    accountRepository = new AccountRepositoryDatabase(connecionAdapter)
  })

  it('should signup', async () => {
    const signup = new SignupUseCase(accountRepository)
    const inputLogin = {
      name: 'Jonh Doe',
      email: `${cuid()}@mail.com`,
      cpf: '87748248800',
      isDriver: true,
      isPassenger: false,
      password: '1234',
      carPlate: 'ABC1234'
    }
    const outputSignup = await signup.execute(inputLogin)
    expect(outputSignup.accountId).toBeDefined()
    await connecionAdapter.close()
  })

  it('should return a error if account does exists', async () => {
    const signup = new SignupUseCase(accountRepository)
    const inputLogin = {
      name: 'Jonh Doe',
      email: `${cuid()}@mail.com`,
      cpf: '87748248800',
      isDriver: true,
      isPassenger: false,
      password: '1234',
      carPlate: 'ABC1234'
    }
    
    await signup.execute(inputLogin)
    expect(() => signup.execute(inputLogin)).rejects.toThrow('Account does exists')
    await connecionAdapter.close()
  })
})