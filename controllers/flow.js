const { get, reply, getIA } = require('../adapter');

const getMessages = async (message) => {
    const data = await get(message);
    return data
};

const responseMessages = async (step) => {
    return(await reply(step));
};

const botResponse = async (message) => {
    return(await getIA(message));
};

module.exports = { getMessages, responseMessages, botResponse }