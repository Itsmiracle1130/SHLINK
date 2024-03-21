import mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from './logging/logger'

dotenv.config()

const dbUrl: string = process.env.DBURL as string

function connectMongoDb() {
    mongoose.connect(dbUrl)
    // { useNewUrlParser: true, useUnifiedTopology: true }
    mongoose.connection.on('connected', () => {
        console.log("MongoDB database connected successfully")
    })

    mongoose.connection.on('error', (err) => {
        logger.error(err.message)
    })
}

export default connectMongoDb