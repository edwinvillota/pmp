import { Router } from 'express'
import UserController from '../controllers/user.controller'
const router = new Router()

router.get('/users', (req, res) => {
  UserController.getAll(req, res)
})

router.post('/users', (req, res) => {
  UserController.register(req, res)
})

router.post('/users/signin', (req, res) => {
  UserController.sign_in(req, res)
})

export default router
