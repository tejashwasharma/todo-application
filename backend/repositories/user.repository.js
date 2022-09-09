const { User } = require('../models');

module.exports.getByQuery = (query = {}, findOne) => new Promise((resolve, reject) => {
    User.find(query)
        .then((users) => {
            resolve(findOne ? users[0] : users);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.createUser = (user) => new Promise((resolve, reject) => {
    User.create(user)
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        })
})
