import { AccountRepository } from "@/repositories/AccountRepository";

export class GetAccountUseCase {
  constructor (private readonly accountRepository: AccountRepository) {}

  async execute(email: string): Promise<Output> {
    const getAccount = await this.accountRepository.getAccount(email)
    if (!getAccount) throw new Error('Account does not exists')
    return {
      accountId: getAccount.accountId,
      name: getAccount.name.getValue(),
      email: getAccount.email.getValue(),
      cpf: getAccount.cpf.getValue(),
      carPlate: getAccount.carPlate,
      password: getAccount.password,
      isDriver: getAccount.isDriver,
      isPassenger: getAccount.isPassenger
    }
  }
}

type Output = {
  accountId: string;
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  password: string;
  isDriver: boolean;
  isPassenger: boolean;
}