import pgp from 'pg-promise'

export class PgPromiseAdapter {
  private connection: any
  
  constructor () {
    this.connection = pgp()("postgres://postgres:docker@localhost:5432/app")
  }

  query (statement: string, params: string[]) {
    return this.connection.query(statement, params)
  }

  async close() {
    await this.connection.$pool.end()
  }
}
