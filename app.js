const fs = require('fs');
require('dotenv').config()
const qrcode = require('qrcode-terminal');
const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const { getMessages, responseMessages, botResponse } = require('./controllers/flow');
const { sendMedia, sendMessage, lastTrigger, saveChat } = require('./controllers/send');
const { generateImage, cleanNumber } = require('./controllers/handle');
const mongoose = require('mongoose');
const ChatbotUserSchema = require("./adapter/mongoDb");


const { searchMessageJson } = require('./controllers/searchLast');
const { agendaname, mailagenda, respagenda, validarEmail } = require('./controllers/agendar');
const { ConversationProfilesClient } = require('@google-cloud/dialogflow');
const { findOne } = require('./adapter/mongoDb');

/**
 * Genero un QRCODE para iniciar sesion
 */
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.initialize();

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
    console.log("AUTHENTICATED");
});

client.on("ready", () => {
    console.log("Client is ready!");
    listenMessage();
});


// para conectar con mongodb
mongoose.connect('mongodb+srv://Matilop15:rDXBmI8gj0kEnN8w@dialogflowclaster.hdwtw8b.mongodb.net/Dialogflow-chatbot?retryWrites=true&w=majority'),
    (err, res) => {
        if (err) return console.log("Hubo un error en la base de datos ", err);
        console.log("BASE DE DATOS ONLINE");
    };

let lastStep = "null";
let step = "null";
let funcagend = null;
let noname = null;
/**
 * Escuchamos cuando entre un mensaje
 */
const listenMessage = () => client.on('message', async msg => {
    const { from, body } = msg;

    // respuestas a historias
    if (from === 'status@broadcast') {
        return
    }
    const number = cleanNumber(from); // saca el @c.us
    // Ignorar mensajes de grupos
    if (number.includes('@g.us')) {
        console.log('soy un grupo');
        return
    };
    // pass all to lowercase
    //let agenda = 0;
    //const agendMessage = await searchMessageJson(number, 1);
    //console.log('Soy lo ultimo en la agenda: ' + agendMessage + '\n');

    //comentar si se usa dialogflow

    if (funcagend === 1) {
        message = body;
    } else {
        message = body.toLowerCase();
    };
    message = body;
    console.log('BODY', message);

    // Save data mongodb
    saveMongo(number, message);
    async function saveMongo(number, message) {
        let chatbotUser = new ChatbotUserSchema({
            number: number,
            message: message
        });
        chatbotUser.save((err, resp) => {
            if (err) return console.log(err);
            console.log("Message save in Mongodb");
            return
        });
    };

        await saveChat(number, message); //save message 


        // Dialogflow 
        if (process.env.DATABASE === 'dialogflow') {
            if (!message.length) return;
            const response = await botResponse(message);
            await sendMessage(client, from, response.replyMessage);
            if (response.media) {
                sendMedia(client, from, response.media);
            }
            return
        }
        /**
        * Ver si viene de un paso anterior
        */
        lastStep = await lastTrigger(from) || null;
        console.log(lastStep);//null no viene de paso anterior
        if (lastStep) {
            console.log('laststep existe \n');
            const response = await responseMessages(lastStep);
            console.log('response no existe\n');
            await sendMessage(client, from, response.replyMessage);
            console.log('sendmensaje no funciona?\n');
        };

        /**
         * Respondemos al primero paso si encuentra palabras clave
         */
        let deef = 0;
        step = await getMessages(message);
        if (step) {
            deef = 1;
            console.log('step:' + step);
            const response = await responseMessages(step);
            await sendMessage(client, from, response.replyMessage, response.trigger);
            if (!response.delay && response.media) {
                sendMedia(client, from, response.media);
            }
            if (response.delay && response.media) {
                setTimeout(() => {
                    sendMedia(client, from, response.media);
                }, response.delay)

            }

            if (step != "STEP_2") {
                funcagend = null;
                return
            }
            funcagend = 1;
            return
        };
        // agendar!!
        if (funcagend === 1 && noname) {
            newMessage = '¿Su nombre es: ' + message + '?\n' + 'Responder si o no';
            await client.sendMessage(number, newMessage);
            funcagend = 2
            return
        };
        if (funcagend === 1) {
            agendaname(number, client);
            funcagend = 2
            return
        };
        if (funcagend === 2) {
            respagenda(client, from, message);
            if (message === "si") {
                funcagend = 3;
                return
            } else if (message === "no") {
                noname = 1;
                funcagend = 1;
                return
            };
        };
        if (funcagend === 3) {
            mailagenda(client, from);
            funcagend = 4;
            return
        };
        if (funcagend === 4) {
            validar = validarEmail(message)
            if (validar = 1) {
                newMessage = "procesando datos";
                client.sendMessage(number, newMessage);
                setTimeout(function () {
                    respuesta1 = searchMessageJson(from, 4);
                    respuesta2 = searchMessageJson(from, 2);
                    respuesta3 = searchMessageJson(from, 1);
                    newMessage = 'Por favor valide sus datos: \n' + '- ' + respuesta1 + '\n' + '- ' + respuesta2 + '\n' + '-' + respuesta3 + '\n' + 'Responda si o no';
                    client.sendMessage(number, newMessage);
                    return
                }, 20000);
                return
            }
            else {
                newMessage = "Por favor brindar un mail valido";
                await client.sendMessage(number, newMessage);
            };
            return
        };


        // mensaje por defecto
        //process.env.DEFAULT_MESSAGE === 'true' || (!step || !lastStep)
        if (process.env.DEFAULT_MESSAGE === 'true' && deef === 0) {
            const response = await responseMessages('DEFAULT');
            console.log('mesaje defaault\n');
            await sendMessage(client, from, response.replyMessage, response.trigger);
            return
        };
    });