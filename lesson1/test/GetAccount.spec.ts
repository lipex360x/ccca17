import { PgPromiseAdapter } from "@/adapters/PgPromise.adapter"
import { Account } from "@/entity/Account"
import { AccountRepository } from "@/repositories/AccountRepository"
import { AccountRepositoryDatabase } from "@/repositories/database/AccountRepositoryDatabase"
import { GetAccountUseCase } from "@/usecases/GetAccount"
import cuid from 'cuid'

let accountRepository: AccountRepository
let connecionAdapter: PgPromiseAdapter
describe('GetAccount', () => {
  beforeEach(() => {
    connecionAdapter = new PgPromiseAdapter()
    accountRepository = new AccountRepositoryDatabase(connecionAdapter)
  })

  it('should retrieve an account', async () => {
    const getAccount = new GetAccountUseCase(accountRepository)
    const inputLogin = {
      name: 'Jonh Doe',
      email: `${cuid()}@mail.com`,
      cpf: '87748248800',
      isDriver: true,
      isPassenger: false,
      password: '1234',
      carPlate: 'ABC1234'
    }
    const account = Account.create(inputLogin.name, inputLogin.email, inputLogin.cpf, inputLogin.carPlate, inputLogin.isPassenger, inputLogin.isDriver, inputLogin.password)
    await accountRepository.saveAccount(account)
    const outputGetAccount = await getAccount.execute(inputLogin.email)
    expect(outputGetAccount.accountId).toBeDefined()
    expect(outputGetAccount.email).toBe(inputLogin.email)
    await connecionAdapter.close()
  })

  it('should return an error if account does not exists', async () => {
    const getAccount = new GetAccountUseCase(accountRepository)
    expect(() => getAccount.execute('fake@mail.com')).rejects.toThrow('Account does not exists')
    await connecionAdapter.close()
  })
})