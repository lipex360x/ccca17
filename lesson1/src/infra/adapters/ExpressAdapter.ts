import type { Request, Response } from 'express'
import express from 'express'
import status from 'http-status'
import cors from 'cors'
import { HttpServer } from '../http/HttpServer'


export class ExpressAdapter implements HttpServer {
  private app: any

  constructor () {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors({
      origin: '*', 
      credentials: true,
    }))
  }


  register(method: string, url: string, callback: Function, statusCode = status.OK): void {
    this.app[method](url, async function (request: Request, response: Response) {
      try {
        const output = await callback(request, request.body)
        response.status(statusCode).json(output)
      } catch (error) {
        response.status(status.UNPROCESSABLE_ENTITY).json({
          message: (error as unknown as Error).message,
        })
      }
    })
  }

  listen(port: number): void {
    this.app.listen(port)
    console.log(`server started. port ${port}`)
  }
}
