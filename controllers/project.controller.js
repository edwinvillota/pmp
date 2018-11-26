import Project from '../models/project'

const ProjectController = {}

ProjectController.getAll = async (req, res) => {
  try {
    await Project.find().sort('number').exec((err, projects) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({ projects })
    })
  } catch (err) {
    res.send(err)
  }
}

ProjectController.addProject = async (req, res) => {
  try {
    if (!req.body.project.number || !req.body.project.client) {
      res.status(403).end()
    }

    const newProject = new Project(req.body.project)

    newProject.save((err, saved) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({ project: saved })
    })
  } catch (err) {
    console.log(err)
  }
}

export default ProjectController
