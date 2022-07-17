const { searchMessageJson } = require('../controllers/searchLast');
const { responseMessages } = require('../controllers/flow');
const { sendMessage } = require('../controllers/send');

const agendaname = async (number, client) => {
    let lastMessage = await searchMessageJson(number, 1);
    newMessage = '¿Su nombre es: ' + lastMessage + '?\n' + 'Responder si o no';
    await client.sendMessage(number, newMessage);
    return
};
const respagenda = async (client, from, message) => {
    if (message === "si") {
        step = "STEP_2_1";
        const response = await responseMessages(step);
        await sendMessage(client, from, response.replyMessage, response.trigger);
        return
    }
    else if (message === "no") {
        step = "STEP_2";
        const response = await responseMessages(step);
        await sendMessage(client, from, response.replyMessage, response.trigger);
        return
    }
};
const mailagenda = async (client, from) => {
    step = "STEP_2_2";
    const response = await responseMessages(step);
    await sendMessage(client, from, response.replyMessage, response.trigger);
    return
};
function validarEmail(mail) {
    re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (!re.exec(mail)) {
        console.log('no valido');
        return 0
    }
    else {
        console.log('valido');
        return 1;
    }
};

module.exports = { agendaname, mailagenda, respagenda, validarEmail }