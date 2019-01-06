import mongoose from 'mongoose'

const Schema = mongoose.Schema

const projectSchema = new Schema({
  number: { type: 'String', required: true },
  client: { type: 'String', required: true },
  object: { type: 'String', required: true },
  interventors: [{
    name: String,
    appointment: String,
    phone: Number,
    description: String
  }],
  place: [{
    name: String
  }],
  budget: [{
    name: String,
    value: Number,
    date: String,
    description: String
  }],
  dates: [{
    name: String,
    date: String,
    description: String
  }]
})

let project = mongoose.model('project', projectSchema)

export default project
