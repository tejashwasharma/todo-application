const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    title: {
        type: String
    },
    archived: {
      type: Boolean,
      default: false
    },
    type: {
        type: String,
        default: 'team'
    }
}, { timestamps: true, collection: 'team' });

const Team = mongoose.model('team', teamSchema);
module.exports = Team;
