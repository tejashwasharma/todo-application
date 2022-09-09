const mongoose = require('mongoose');
require('dotenv').config();
const { MONGODB_URI } = require('../config')[process.env.ENV || 'dev'];

mongoose.connect(MONGODB_URI);
mongoose.set('debug', process.env.ENV === 'dev' ? true : false);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('./user.model'),
    BoardItems: require('./boardItems.model'),
    Team: require('./team.model'),
    mongoose: mongoose
};