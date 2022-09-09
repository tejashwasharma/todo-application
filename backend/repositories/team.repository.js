const { Team } = require('../models');

module.exports.getByQuery = (query = {}, findOne) => new Promise((resolve, reject) => {
    Team.find(query)
        .then((teams) => {
            resolve(findOne ? teams[0] : teams);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.createTeam = (team) => new Promise((resolve, reject) => {
    Team.create(team)
        .then((team) => {
            resolve(team);
        })
        .catch((err) => {
            reject(err);
        })
})
