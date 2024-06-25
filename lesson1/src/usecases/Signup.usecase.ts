import { Account } from "@/entity/Account"
import { AccountRepository } from "@/repositories/AccountRepository"

export class SignupUseCase {
  
  constructor (private readonly accountRepository: AccountRepository) {}

  async execute(input: Input): Promise<Output> {
    const getAccount = await this.accountRepository.getAccount(input.email)
    if (getAccount) throw new Error('Account does exists')
    const account = Account.create(input.name, input.email, input.cpf, input.carPlate, input.isPassenger, input.isDriver, input.password)
    await this.accountRepository.saveAccount(account)
    return { accountId: account.accountId }
  }
}

type Input = {
    name: string;
    email: string;
    cpf: string;
    carPlate: string;
    password: string;
    isDriver: boolean;
    isPassenger: boolean;
}

type Output = {
  accountId: string
}