const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
  createMeeting
} = require('./server/db');
const checkMillionDollarIdea = require('./server/checkMillionDollarIdea');


const app = express();
const PORT = process.env.PORT || 4001;

// Set up body-parsing middleware
app.use(bodyParser.json());

// Set up CORS middleware
app.use(cors());
// Mount the apiRouter
const apiRouter = express.Router();

// Routes for /api/minions

apiRouter.get('/minions', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).json(minions);
});

apiRouter.post('/minions', (req, res) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).json(newMinion);
});

apiRouter.get('/minions/:minionId', (req, res) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    res.status(200).json(minion);
  } else {
    res.status(404).send();
  }
});

apiRouter.put('/minions/:minionId', (req, res) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  if (updatedMinion) {
    res.status(200).json(updatedMinion);
  } else {
    res.status(404).send();
  }
});

apiRouter.delete('/minions/:minionId', (req, res) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Routes for /api/minions/:minionId/work

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
  const minionId = req.params.minionId;
  const newWork = { ...req.body, minionId: minionId };
  const createdWork = addToDatabase('work', newWork);
  res.status(201).json(createdWork);
});

// Update a specific work for a minion
// Update a single work by id
// Update a single work by id

apiRouter.put('/minions/:minionId/work/:workId', (req, res) => {
  const minionId = req.params.minionId;
  const workId = req.params.workId;

  // Validate that the minion ID is numeric
  if (isNaN(Number(minionId))) {
    res.status(404).send('Invalid minion ID');
    return;
  }

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
  if (work.minionId !== minionId) {
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
  const deleted = deleteFromDatabasebyId('work', workId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Routes for ideas:

// Routes for /api/ideas

apiRouter.get('/ideas', (req, res) => {
  const ideas = getAllFromDatabase('ideas');
  res.status(200).json(ideas);
});

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).json(newIdea);
});

apiRouter.get('/ideas/:ideaId', (req, res) => {
  const idea = getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    res.status(200).json(idea);
  } else {
    res.status(404).send();
  }
});

apiRouter.put('/ideas/:ideaId',  (req, res) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  if (updatedIdea) {
    res.status(200).json(updatedIdea);
  } else {
    res.status(404).send();
  }
});

apiRouter.delete('/ideas/:ideaId', (req, res) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Routes for meetings:

// Routes for /api/meetings
apiRouter.get('/meetings', (req, res) => {
  const meetings = getAllFromDatabase('meetings');
  res.status(200).json(meetings);
});

apiRouter.post('/meetings', (req, res) => {
  const newMeeting = createMeeting();
  addToDatabase('meetings', newMeeting);
  res.status(201).json(newMeeting);
});

apiRouter.delete('/meetings', (req, res) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});



// Mount the apiRouter at /api
app.use('/api', apiRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const path = require('path');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname,)));
module.exports = app;
