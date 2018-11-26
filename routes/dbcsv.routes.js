import { Router } from 'express'
import Dbcsv from '../controllers/dbcsv.controller'
const router = new Router()

router.get('/dbcsv/getUsers', (req, res) => {
  Dbcsv.getUsers(req, res)
})

router.post('/dbcsv/getInfo', (req, res) => {
  Dbcsv.getInfo(req, res)
})

router.get('/dbcsv/getLec', (req, res) => {
  Dbcsv.getLec(req, res)
})

export default router
