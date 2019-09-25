import mongoose from 'mongoose'

const Schema = mongoose.Schema

const transformerSchema = new Schema({
    structure: {type: 'String', required: true, unique: true},
    town: {type: 'String', required: true},
    macro: {type: 'Number', required: true},
    kva: {type: 'Number', required: false},
    ratio: {type: 'Number', required: true},
})

let transformer = mongoose.model('transformer', transformerSchema)   

export default transformer