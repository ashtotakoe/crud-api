import dotenv from 'dotenv'

import { DB } from './db/data-base'
import { Server } from './server/server'

dotenv.config()

const { PORT } = process.env

if (!PORT) {
  console.error('PORT is not defined in .env')
}

const server = new Server({ port: Number(PORT), db: new DB() })

server.start()
