import Appointment from '../models/appointment'
import validateAppointment from '../validation/appointment'

const AppointmentController = {}

AppointmentController.getAll = async (req, res) => {
  try {
    await Appointment.find().sort('name').exec((err, appointments) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({ appointments })
    })
  } catch (err) {
    res.send(err)
  }
}

AppointmentController.addAppointment = async (req, res) => {
  const { errors, isValid } = validateAppointment.add(req.body.newAppointment)

  if (!req.body.newAppointment) {
    res.status(403).end()
  }
  if (!isValid) {
    return res.status(400).json(errors)
  }
  let newAppointment = new Appointment(req.body.newAppointment)
  newAppointment.save((err, saved) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.json({ user: saved })
    }
  })
}

export default AppointmentController
