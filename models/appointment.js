import mongoose from 'mongoose'
const Schema = mongoose.Schema

let appointmentSchema = new Schema({
  name: { type: 'String', required: true, unique: true },
  description: { type: 'String' }
})

let appointment = mongoose.model('appointment', appointmentSchema)

export default appointment
