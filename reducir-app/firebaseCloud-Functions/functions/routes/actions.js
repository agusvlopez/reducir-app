// const express = require('express');
// const ActionsController = require('../controllers/actions.js');

// const app = express();

// app.use(express.json());

// app.post("/api/create",  ActionsController.createAction);

// module.exports = app;


// functions/routes/actionsRoutes.js
const express = require('express');
const ActionsController = require('../controllers/actions.js');

const router = express.Router();

router.post("/api/create", ActionsController.createAction);

module.exports = router;