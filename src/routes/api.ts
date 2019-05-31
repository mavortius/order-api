import * as apiController from '../controllers/api.controller'

export class APIRoute {
  public routes(app): void {
    app.route('/api').get(apiController.getApi)
  }
}
