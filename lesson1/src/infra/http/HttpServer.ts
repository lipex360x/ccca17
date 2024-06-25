export interface HttpServer {
  register(method: string, url: string, callback: Function, statusCode?: number): void
  listen(port: number): void
}
