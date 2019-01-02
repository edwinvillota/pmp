import { Router } from 'express'
import ProjectController from '../controllers/project.controller'
import Auth from '../middlewares/authorization'
const router = new Router()

router.use('/', Auth.verifyAuth)
router.get('/projects', (req, res) => {
  ProjectController.getAll(req, res)
})

router.post('/projects', (req, res) => {
  ProjectController.addProject(req, res)
})

export default router
