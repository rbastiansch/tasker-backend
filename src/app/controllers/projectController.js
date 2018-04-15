const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate([ 'user', 'tasks' ]);
    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading projects' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const project = await Project.create({ title, description, user: req.userId });

    return res.send({ project });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Error creating new project '});
  }
});

module.exports = app => app.use('/projects', router);