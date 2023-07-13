const express = require('express');
const apiRouter = express.Router();
const db = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// Routes for /api/minions

apiRouter.get('/minions', (req, res) => {
  const minions = db.getAllFromDatabase('minions');
  res.status(200).json(minions);
});

apiRouter.post('/minions', (req, res) => {
  const newMinion = db.addToDatabase('minions', req.body);
  res.status(201).json(newMinion);
});

apiRouter.get('/minions/:minionId', (req, res) => {
  const minion = db.getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    res.status(200).json(minion);
  } else {
    res.status(404).send();
  }
});

apiRouter.put('/minions/:minionId', (req, res) => {
  const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
  if (updatedMinion) {
    res.status(200).json(updatedMinion);
  } else {
    res.status(404).send();
  }
});

apiRouter.delete('/minions/:minionId', (req, res) => {
  const deleted = db.deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Get all work for a specific minion
apiRouter.get('/minions/:minionId/work', (req, res) => {
  const minionId = req.params.minionId;
  const work = getAllFromDatabase('work').filter((entry) => entry.minionId === minionId);
  if (work.length === 0) {
    res.status(404).send();
  } else {
    res.status(200).json(work);
  }
  });
  
  // Create new work for a specific minion
  apiRouter.post('/minions/:minionId/work', (req, res) => {
    const minionId = parseInt(req.params.minionId); // Convert the ID to an integer
    if (isNaN(minionId)) {
      res.status(404).send('Invalid ID');
      return;
    }
    
    const minion = db.getFromDatabaseById('minions', minionId);
    if (!minion) {
      res.status(404).send('Minion not found.');
      return;
    }
  
    const newWork = { ...req.body, minionId: req.params.minionId };
    const createdWork = db.addToDatabase('work', newWork);
    res.status(201).json(createdWork);
  });
  
  // Update a single work by id
  apiRouter.put('/minions/:minionId/work/:workId', (req, res) => {
    const minionId = parseInt(req.params.minionId); // Convert the ID to an integer
    if (isNaN(minionId)) {
      res.status(404).send('Invalid minion ID');
      return;
    }
  
    const workId = req.params.workId;
  
    // Validate that the work ID is numeric
    if (isNaN(Number(workId))) {
      res.status(404).send('Invalid work ID');
      return;
    }
  
    // Get the work from the database
    const work = getFromDatabaseById('work', workId);
  
    // Check if the work exists
    if (!work) {
      res.status(404).send('Work not found');
      return;
    }
  
    // Check if the work belongs to the specified minion
    if (work.minionId !== minionId.toString()) {
      res.status(400).send('Invalid request');
      return;
    }
  
    const updatedWork = updateInstanceInDatabase('work', req.body);
    if (updatedWork) {
      res.status(200).json(updatedWork);
    } else {
      res.status(404).send();
    }
  });
  
  
  
  
  
  // Delete a specific work for a minion
  apiRouter.delete('/minions/:minionId/work/:workId', (req, res) => {
    const workId = req.params.workId;
    const deleted = db.deleteFromDatabasebyId('work', workId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });
  

// Routes for /api/ideas

apiRouter.get('/ideas', (req, res) => {
  const ideas = db.getAllFromDatabase('ideas');
  res.status(200).json(ideas);
});

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).json(newIdea);
});

apiRouter.get('/ideas/:ideaId', (req, res) => {
  const idea = db.getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    res.status(200).json(idea);
  } else {
    res.status(404).send();
  }
});

apiRouter.put('/ideas/:ideaId', checkMillionDollarIdea, (req, res) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
  if (updatedIdea) {
    res.status(200).json(updatedIdea);
  } else {
    res.status(404).send();
  }
});

apiRouter.delete('/ideas/:ideaId', (req, res) => {
  db.deleteFromDatabasebyId('ideas', req.params.ideaId);
  res.status(204).send();
});

module.exports = apiRouter;
