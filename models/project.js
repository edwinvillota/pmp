import mongoose from 'mongoose'
const Schema = mongoose.Schema

const projectSchema = new Schema({
  number: { type: 'String', required: true },
  client: { type: 'String', required: true },
  description: { type: 'String', required: true }
})

let project = mongoose.model('project', projectSchema)

export default project
