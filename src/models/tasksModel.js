const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // pour email unique
//const { emit } = require('../app');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {type:String},
  status: {
    type: String,
    enum: ['À faire', 'En cours', 'Terminé'],
    default: 'À faire'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

taskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Task', taskSchema);