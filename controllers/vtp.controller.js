import vtp_report from '../models/vtp_report'

const VTPController = {}

VTPController.addVTPReport = async (req,res) => {
    const newReport = new vtp_report(req.body.report)
    newReport.save((err, saved) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Se registro un reporte")
        }
    })
}

VTPController.getVTPReports = async (req, res) => {
    const {
        serial,
        init_date,
        end_date
    } = req.query
    
    vtp_report.find({
        $and:
            [
                {serial: {$eq: serial}},
                {date: {$gte: init_date}},
                {date: {$lte: end_date}}
            ]
    })
    .sort({
        date: 1
    })
    .exec((err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error')
        } else {
            res.status(200).send(data)
        }
    })
}

export default VTPController