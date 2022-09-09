const userRepository = require('../repositories/user.repository');
const boardItemsRepository = require('../repositories/boardItems.repository');

const getUserboard = (_id) => new Promise(async (resolve, reject) => {
    try {
        let user = await userRepository.getByQuery({ _id }, true);
        let boardItems = await boardItemsRepository.getByQuery({ team: user.team });
        let board = boardItems.reduce((acc, c) => {
            if (acc[c.status]) acc[c.status].push(c);
            else acc[c.status] = [c];
            return acc;
        }, { "To do": [], "In Progress": [], "Completed": [] });
        resolve({ board });
    } catch (err) {
        reject(err);
    }
});
module.exports.getUserboard = getUserboard;

const rearrageOrder = async (currentItem) => {
    await boardItemsRepository.updateByQuery(
        { $and: [{ $gte: { position: currentItem.postion } }, { _id: { $ne: currentItem._id } }, { status: currentItem.status }] },
        { $inc: { position: 1 } },
    );
}

module.exports.createBoardItem = (data) => new Promise(async (resolve, reject) => {
    try {
        let user = await userRepository.getByQuery({ _id: data.user }, true);
        data.team = user.team;
        data.createdBy = user._id;
        let currentItem = await boardItemsRepository.createBoardItem(data);
        await rearrageOrder(currentItem);
        const { board } = await getUserboard(data.user);
        resolve({ board });
    } catch (err) {
        reject(err);
    }
})

module.exports.updateBoardItem = (item) => new Promise(async (resolve, reject) => {
    try {
        const itemId = item._id;
        delete item._id;
        await boardItemsRepository.updateByQuery({ _id: itemId }, { $set: item });
        await rearrageOrder(item);
        const { board } = await getUserboard(item.user);
        resolve({ board });
    } catch (err) {
        reject(err);
    }
})
