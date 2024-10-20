// routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const ProjectModel = require('../models/projects');

// Endpoint to approve a project
router.put('/:projectId/approve', async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findByIdAndUpdate(projectId, { status: 'approved' }, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Endpoint to reject a project
router.put('/:projectId/reject', async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findByIdAndUpdate(projectId, { status: 'reject' }, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to assign a site engineer to a project
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, siteengName, projectId, email, number, address } = req.body;
  
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { name, siteengName, projectId, email, number, address },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint to add a project
router.post('/addproject',  async (req, res) => {
  try {
      const { cName, cAddress,name, address, projectId ,email , number } = req.body;
      await ProjectModel.create({ cName,cAddress, name, address, projectId , email , number });
      res.json({ status: 'success' });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:projectId/AddRGN', async (req, res) => {
  const { projectId } = req.params;  // Extract projectId from the URL
  const { RGN } = req.body;          // Extract RGN from the request body
  const incrementN = RGN + 0

  try {
    // Use projectId as the query field if it's a field in your MongoDB schema
    const project = await Project.findOneAndUpdate({ projectId }, { RGN:incrementN}, { new: true });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project, incrementN);  // Return the updated project
    console.log(project)
  } catch (error) {
    
    res.status(200).json({ message: 'Success' });

  }
});



router.get('/getprojects', async (req, res) => {
  try {
      const projects = await ProjectModel.find();
      res.send(projects);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
      await Project.findByIdAndDelete(projectId);
      res.json({ status: 'success' });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
