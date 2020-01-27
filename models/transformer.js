import mongoose from 'mongoose'
import moment from 'moment'

const Schema = mongoose.Schema

const transformerSchema = new Schema({
    structure: {type: 'String', required: true, unique: true},
    town: {type: 'String', required: true},
    address: {type: 'String', required: true},
    kva: {type: 'Number', required: false},
    creation_date: {type: 'Date', required: true, default: Date.now()},
    status: {type: 'String', required: true, default: 'REGISTERED'},
    location: {type: 'String', required: true, default: 'uncaptured'},
    photo: {type: 'String', required: true, default: 'uncaptured'},
})

let transformer = mongoose.model('transformer', transformerSchema)   

export default transformer