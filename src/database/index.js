const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tasker');
mongoose.Promise = global.Promise;

module.exports = mongoose;