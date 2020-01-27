import mongoose from 'mongoose'

const Schema = mongoose.Schema

const macroSchema = new Schema({
    serial: {type: 'Number', required: true, unique: true},
    ratio: {type: 'Number', required: true},
    new: {type: 'Boolean', required: true},
    instalation_date: {type: 'Date'},
    transformer_id: {type: Schema.ObjectId, ref: 'transformer', required: true, unique: true}
})

const macro = mongoose.model('macrometer', macroSchema)

export default macro