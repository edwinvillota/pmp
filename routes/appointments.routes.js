import { Router } from 'express'
import AppointmentController from '../controllers/appointment.controller'
const router = new Router()

router.get('/appointments', (req, res) => {
  AppointmentController.getAll(req, res)
})

router.post('/appointments', (req, res) => {
  AppointmentController.addAppointment(req, res)
})

export default router
