const userRepository = require('../repositories/user.repository');
const teamRepository = require('../repositories/team.repository');
const { FORBIDDEN, NOT_FOUND, UNPROCESSABLE_ENTITY } = require('../util/statusCode');
const { generateAccessToken } = require('../util');

module.exports.login = (credentials) => new Promise(async (resolve, reject) => {
    try {
        let user = await userRepository.getByQuery({ email: credentials.email }, true);
        if (user && user._id) {
            let isPasswordMatch = await user.comparePassword(credentials.password);
            if (isPasswordMatch) {
                user = user.toObject();
                let team = await teamRepository.getByQuery({ _id: user.team }, true);
                delete user.password;
                const token = `Bearer ${generateAccessToken(user._id)}`;
                user.token = token;
                resolve({ user, team, token });
            } else {
                reject(FORBIDDEN);
            }
        } else {
            reject(NOT_FOUND);
        }
    } catch (err) {
        reject(err);
    }
});

module.exports.signup = (user) => new Promise(async (resolve, reject) => {
    try {
        let exisitingUser = await userRepository.getByQuery({ email: user.email });
        if (exisitingUser && exisitingUser._id) {
            reject(UNPROCESSABLE_ENTITY);
        } else {
            if (!user.team) {
                let team = await teamRepository.createTeam({ title: '.taskez' });
                team = team.toObject();
                user.team = team._id;
            }
            user = await userRepository.createUser(user);
            user = user.toObject();
            delete user.password;
            resolve(user);
        }
    } catch (err) {
        reject(err);
    }
});
