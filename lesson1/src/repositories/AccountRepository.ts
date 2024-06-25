import { Account } from "@/entity/Account"

export interface AccountRepository {
  saveAccount(account: Account): Promise<void>
  getAccount(email: string): Promise<Account | null>
}
