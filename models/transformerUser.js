import mongoose from 'mongoose'
const transformer = mongoose.model('transformer')

const Schema = mongoose.Schema

const transformerUserSchema = new Schema({
    meter: {type: 'String', required: true, unique: true},
    brand: {type: 'String', required: true},
    code: {type: 'Number', required: true},
    address: {type: 'String', required: false},
    transformer: {type: Schema.ObjectId, ref: 'transformer'}
})

let transformerUser = mongoose.model('transformerUser', transformerUserSchema)

export default transformerUser