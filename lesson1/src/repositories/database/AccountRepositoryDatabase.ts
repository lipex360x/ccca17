import { Account } from "@/entity/Account"
import { AccountRepository } from "../AccountRepository"

export class AccountRepositoryDatabase implements AccountRepository{
  constructor (private readonly connection: any) {}

  async saveAccount(account: Account): Promise<void> {
    await this.connection.query("insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [account.accountId, account.name.getValue(), account.email.getValue(), account.cpf.getValue(), account.carPlate, !!account.isPassenger, !!account.isDriver]);
  }

  async getAccount(email: string): Promise<Account | null> {
    const [accountData] = await this.connection.query("select * from cccat17.account where email = $1", [email]);
    if (!accountData) return null
    const account = Account.restore(accountData.account_id, accountData.name, accountData.email, accountData.cpf, accountData.car_plate, accountData.is_passenger, accountData.is_driver, accountData.password)
    return account
  }
}