// const ActionsService = require("../services/actions.js");

// async function createAction(req, res){

//     return ActionsService.createAction(req.body)
//     .then(function(action){
//      res.status(201).json(action)
//     })
//     .catch(function(err){
//      res.status(500).json({ msg: err.msg });
//     })
// }


// module.exports = {
//     createAction
// };

// functions/controllers/actionsController.js
const ActionsService = require('../services/actions.js');

async function createAction(req, res) {
  try {
    const action = await ActionsService.createAction(req.body)
    .then(function(action){
        res.status(201).json(action);
        console.log(action);
    })
    // res.status(201).json(action);
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
}

module.exports = {
  createAction
};