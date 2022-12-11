import * as express from 'express'
import DevModel from '../models/dev'
import DevNotFoundException from '../exceptions/devNotFoundException'

class LikeController {
  public path = '/dev'
  public router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.post(this.path, this.store)
  }

  store = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    console.log(request.io, request.connectedUsers)

    const { username } = request.headers
    const { id } = request.params

    const loggedDev = await DevModel.findById(username)
    const targetDev = await DevModel.findById(id)
    
    if(!targetDev) {
      next(new DevNotFoundException(username))
    }

    if(targetDev?.likes.includes(loggedDev!._id)) {
      const loggedSocket = request.connectedUsers[username]
      const targetSocket = request.connectedUsers[id]
    }
  }
}

export default LikeController