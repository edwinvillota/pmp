import { Router } from 'express'
import VTPController from '../controllers/vtp.controller'

const router = new Router()

router.get('/vtp_reports', (req, res) => {
    VTPController.getVTPReports(req, res)
})

router.post('/vtp_reports', (req, res) => {
    VTPController.addVTPReport(req, res)
})

export default router