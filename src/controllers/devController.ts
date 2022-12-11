import axios from 'axios';
import * as express from 'express';
import Dev from '../interfaces/dev';
import DevModel from '../models/dev';
import DevNotFoundException from '../exceptions/devNotFoundException';

class DevController {
  public path = '/dev'
  public router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.index)
    this.router.post(this.path, this.store)
  }

  index = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const { username } = request.headers

    try {
      const loggedDev : Dev | null = await DevModel.findOne({ username: username })

      if (loggedDev === null) {
        next(new DevNotFoundException(username))
      }

      const devs = await DevModel.find({
        $and: [
          { _id: { $ne: username } },
          { _id: { $nin: loggedDev?.likes }},
          { _id: { $nin: loggedDev?.dislikes }}
        ]
      })

      return response.json(devs)
    } catch (error) {
      console.log(error)
    }
  }

  store = async (request: express.Request, response: express.Response) => {
    const { username } = request.headers

    const userExist = await DevModel.findOne({ username: username})

    if(userExist) {
      return response.json(userExist)
    }

    const query = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = query.data;

    const dev = await DevModel.create({
      name: name,
      username: username,
      bio: bio,
      avatar: avatar
    })

    return response.json(dev)
  }
}

export default DevController