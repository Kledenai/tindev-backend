import cors from 'cors'
import http from 'http'
import express from 'express'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import Controller from './interfaces/controller'
import errorMiddleware from './middleware/errorMiddleware'

class App {
	public io: Server
	public server: any
	public app: express.Application
	public connectedUsers : Object

	constructor(controllers: Controller[]) {
		this.app = express()
		this.server = http.createServer(this.app)
		this.io = new Server(this.server)

		this.connectedUsers = {}

		this.setCustomRequest()
		this.initializeSocketIo()
		this.connectToTheDatabase()
		this.initializeMiddlewares()
		this.initializeControllers(controllers)
    this.initializeErrorHandling()
	}

  public listen() {
		this.app.listen(process.env.PORT || 3333, () => {
      console.log(`App listening on the port ${process.env.PORT || 3333}`)
		})
	}

  public getServer() {
    return this.app
  }

	private setCustomRequest() {
		this.app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
			request.io = this.io
			request.connectedUsers = this.connectedUsers

			return next()
		})
	}

	private initializeSocketIo() {
		const io = this.io

		io.on("connection", (socket) => {
			const { user } : any = socket.handshake.query;

			console.log(user, socket.id)

			this.connectedUsers[user]
		})
	}

	private initializeMiddlewares() {
		this.app.use(cors())
		this.app.use(bodyParser.json())
	}

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

	private initializeControllers(controllers: Controller[]) {
		controllers.forEach((controller) => {
        this.app.use('/', controller.router)
    })
	}

	private connectToTheDatabase() {
		const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env

		mongoose.set("strictQuery", true)

    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`)
  }
}

export default App
