import mongoose from 'mongoose'
const Schema = mongoose.Schema

const vtp_reportSchema = new Schema({
    serial: { type: 'String' },
    date: { type: 'Date'},
    ip: { type: 'String' },
    cts: [{
        ct: Number,
        unknown_1: String,
        consumption: Number,
        unknown_2: Number,
        voltage: Number,
        current: Number,
        unknown_3: Number,
        unknown_4: Number,
        unknown_5: Number
    }]
})

const vtp_report = mongoose.model('vtp_report', vtp_reportSchema)

export default vtp_report