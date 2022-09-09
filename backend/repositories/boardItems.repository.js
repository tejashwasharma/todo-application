const { BoardItems } = require('../models');

module.exports.getByQuery = (query = {}, findOne) => new Promise((resolve, reject) => {
    BoardItems.find(query).sort("position")
        .then((boardItems) => {
            resolve(findOne ? boardItems[0] : boardItems);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.createBoardItem = (boardItem) => new Promise((resolve, reject) => {
    BoardItems.create(boardItem)
        .then((boardItem) => {
            resolve(boardItem);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.updateByQuery = (findQuery, updateQuery) => new Promise((resolve, reject) => {
    BoardItems.updateMany(findQuery, updateQuery)
        .then((boardItems) => {
            resolve(boardItems);
        })
        .catch((err) => {
            reject(err);
        })
})
