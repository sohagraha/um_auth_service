import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function connect() {
  try {
    await mongoose.connect(config.DATABASE_URL as string)
    console.log('Connect successfully!!!')
    app.listen(config.PORT, () => {
      console.log(`Application start on : ${config.PORT}`)
    })
  } catch (error) {
    console.log('Connect failure!!!')
  }
}

connect()
