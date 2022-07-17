const ChatbotUserSchema = require("../adapter/mongoDb");

async function saveMongo(number, message) {
    let chatbotUser = new ChatbotUserSchema({
        number: number,
        message: message
    });
    chatbotUser.save((err, resp) => {
        if (err) return
        return
    });
};

module.exports = { saveMongo };