const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatbotUserSchema = new Schema(
    {
        number: {
            type: String,
            unique: true,
        },
        message: Array,
    },
    { timestamps: true }
);

module.exports = mongoose.model("chatbot-User", ChatbotUserSchema);
