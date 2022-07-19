const ChatbotUserSchema = require("../adapter/mongoDb");

async function saveMongo(number, message) {
    let isRegistered = await ChatbotUserSchema.findOne({number});
    if (isRegistered) {
        addMessageToMongo(number, message);
        return;
    }
    let chatbotUser = new ChatbotUserSchema({
        number: number,
        message: message
    });
    chatbotUser.save((err, resp) => {
        if (err) {
            console.log(err);
            return
        }
        return
    });
};


function addMessageToMongo(number, message) {
    ChatbotUserSchema.updateOne({ number }, { $push: { message: { message: message } } }, (err, res) => {
        if (err) {
            console.log(err);
            return
        }
        return
    });
    return
};

module.exports = { saveMongo };