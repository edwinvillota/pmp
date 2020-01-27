import mongoose from 'mongoose'
const transformer = mongoose.model('transformer')

const Schema = mongoose.Schema

const transformerUserSchema = new Schema({
    type: {type: 'String', required: true},
    meter: {type: 'String', required: true},
    brand: {type: 'String', required: true},
    code: {type: 'Number', required: true},
    address: {type: 'String', required: true},
    location: {type: 'String', required: true, default: 'uncaptured'},
    factor: {type: 'Number', required: true},
    node_id: {type: 'Number', required: true, default: 99},
    transformer_id: {type: Schema.ObjectId, ref: 'transformer'},
    user_photo: {type: 'String', required: true, default: 'uncaptured'},
    origin: {type: 'String', required: true, default: 'Supernova'},
    creation_date: {type: 'Number', required: true, default: Date.now()}
})

let transformerUser = mongoose.model('transformerUser', transformerUserSchema)

export default transformerUser