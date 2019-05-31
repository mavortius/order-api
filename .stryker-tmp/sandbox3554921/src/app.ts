import * as bodyParser from 'body-parser'
import * as express from 'express'
import { UserRoute } from './routes/user'
import { OrderRoute } from './routes/order'
import { APIRoute } from './routes/api'

class App {
  public app: express.Application
  public userRoutes: UserRoute = new UserRoute()
  public apiRoutes: APIRoute = new APIRoute()
  public orderRoutes: OrderRoute = new OrderRoute()

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.userRoutes.routes(this.app)
    this.apiRoutes.routes(this.app)
    this.orderRoutes.routes(this.app)
  }

}

export default new App().app
