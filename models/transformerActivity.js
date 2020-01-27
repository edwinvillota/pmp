import mongoose from 'mongoose'
const transformer = mongoose.model('transformer')

const Schema = mongoose.Schema

const transformerActivitySchema = new Schema({
    type: {
        type: String,
        enum: ['STAKEOUT','LECTURE'],
        default: 'STAKEOUT'
    },
    creation_date: {type: Date, default: Date.now()},
    transformer_id: {type: Schema.ObjectId, ref: 'transformer', required: true},
    status: {
        type: String,
        enum: ['REGISTERED', 'PROCESS', 'SUCCESS', 'CANCELED'],
        default: 'REGISTERED'
    },
    creator: {type: String, required: true},
    asigned_to: {type: Schema.ObjectId, ref: 'user'}
})

const transformerActivity =  mongoose.model('trasformerActivity', transformerActivitySchema)

export default transformerActivity
