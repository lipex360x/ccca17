import { PgPromiseAdapter } from "./adapters/PgPromise.adapter";
import { ExpressAdapter } from "./infra/adapters/ExpressAdapter";
import { AccountRepositoryDatabase } from "./repositories/database/AccountRepositoryDatabase";

const httpServer = new ExpressAdapter()
const connecionAdapter = new PgPromiseAdapter()
const AccountRepository = new AccountRepositoryDatabase(connecionAdapter)

httpServer.listen(3333)