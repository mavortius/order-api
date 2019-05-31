import { NextFunction, Request, Response } from 'express'
import { formatOutput } from '../utilities/order-api-utility'

export let getApi = (req: Request, res: Response, next: NextFunction) => {
  return formatOutput(res, { title: 'Order API' }, 200)

}
