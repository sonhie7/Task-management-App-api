const express = require("express");
const auth = require('../middlewares/auth');
const router = express.Router();
const tasksController = require("../controllers/tasksController");


router.get('/',  tasksController.getAllTasks);
router.get('/:id', tasksController.getTaskById);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;