import { Response } from 'express'
import * as xmlParser from 'js2xmlparser'
import { ApplicationType } from '../models/application-type'

export let formatOutput = (res: Response, data: any, statusCode: number, rootElement?: string) => {
  return res.format({
    json: () => {
      res.type(ApplicationType.JSON)
      res.status(statusCode).send(data)
    },
    xml: () => {
      res.type(ApplicationType.XML)
      res.status(statusCode).send(xmlParser.parse(rootElement, data))
    },
    default: () => {
      res.status(406).send()
    },
  })
}
