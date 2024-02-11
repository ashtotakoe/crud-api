import dotenv from 'dotenv'

import { Server } from './server/server'

dotenv.config()

const { PORT } = process.env

if (!PORT) {
  console.error('PORT is not defined in .env')
}
const server = new Server({ port: Number(PORT) })

server.start()
