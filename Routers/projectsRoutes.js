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
  const { projectId } = req.params;
  const { RGN } = req.body; // Expecting RGN from request body for explicit control

  try {
    // Validate projectId
    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    // Fetch the current project with explicit projection
    const project = await Project.findOne({ projectId }).select('RGN');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Determine the new RGN value
    let newRGN;
    if (RGN !== undefined && !isNaN(RGN)) {
      // If RGN is provided in the request body, use it
      newRGN = Number(RGN);
    } else {
      // Otherwise increment the existing RGN (default to 0 if undefined)
      newRGN = (project.RGN || 0) + 1;
    }

    // Update project with the new RGN value using findOneAndUpdate
    const updatedProject = await Project.findOneAndUpdate(
      { projectId },
      { $set: { RGN: newRGN } },
      { 
        new: true, // Return the updated document
        upsert: false, // Don't create new document if not found
        runValidators: true // Run schema validators
      }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Failed to update project' });
    }

    // Return success response with updated RGN
    res.status(200).json({
      success: true,
      RGN: updatedProject.RGN,
      project: {
        projectId: updatedProject.projectId,
        RGN: updatedProject.RGN
      }
    });

  } catch (error) {
    console.error('Error updating RGN:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

router.get('/:projectId/getRGN', async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findOne({ projectId });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ RGN: project.RGN }); // Return only the RGN value
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
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
