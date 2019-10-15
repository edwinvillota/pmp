import mongoose from 'mongoose'
import LecStatus from '../models/lecStatus'

const AnalysisController = {}

AnalysisController.addLecStatus = async (req, res) => {
    const reqLecStatus = req.body.LecStatus
    const newLecStatus = new LecStatus(reqLecStatus)
    newLecStatus.save((err, saved) => {
        if (err) {
            res.status(500).send({status: 'ERROR', msg: err})
        } else {
            res.status(200).send({status: 'OK', saved: saved})
        } 
    })
}

AnalysisController.getLecStatus = async (req, res) => {
    const { type, lastRecords } = req.params


    LecStatus
        .find({tipo_medida: type})
        .limit(parseInt(lastRecords))
        .sort({fecha_estado: -1})
        .exec((err, data) => {
        if (err) {
            res.status(500).json({
                status: 'Error',
                msg: err,
                record: []
            })
        } else {
            res.status(200).json({
                status: 'OK',
                msg: 'Sucessfull',
                records: data
            })
        }
    })
}

export default AnalysisController