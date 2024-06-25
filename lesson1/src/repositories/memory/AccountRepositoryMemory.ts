import { Account } from "@/entity/Account"
import { AccountRepository } from "../AccountRepository"

export class AccountRepositoryMemory implements AccountRepository{
  account: Account[] = []

  async saveAccount(account: Account): Promise<void> {
    this.account.push(account)
  }

  async getAccount(email: string): Promise<Account | null> {
    const account = this.account.find(acc => acc.email.getValue() === email)
    return account || null
  }
}