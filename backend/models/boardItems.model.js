const mongoose = require('mongoose');

const boardItemSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    position: {
        type: Number
    },
    status: {
        type: String,
        enum: ['To do', 'In Progress', 'Completed']
    },
    team: {
        type: mongoose.Types.ObjectId
    },
    createdBy: {
        type: mongoose.Types.ObjectId
    },
    archived: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'boardItem'
    }
}, { timestamps: true, collection: 'board-item' });

const BoardItem = mongoose.model('board-item', boardItemSchema);
module.exports = BoardItem;
