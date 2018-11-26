import mongoose from 'mongoose'
import config from '../config/index'

mongoose.Promise = global.Promise

const connectToDb = async () => {
  try {
    mongoose.set('useCreateIndex', true)
    await mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  } catch (err) {
    console.log(err)
  }
}

export default connectToDb
