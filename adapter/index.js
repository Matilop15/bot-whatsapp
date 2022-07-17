const stepsInitial = require('../flow/initialflow.json');
const stepsReponse = require('../flow/response.json');
const { saveMessageJson } = require('./jsonDb');
const { getDataIa } = require('./dialogflow');

const get = (message) => new Promise((resolve, reject) => {
    if (process.env.DATABASE === 'none') {
        const { key } = stepsInitial.find(k => k.keywords.includes(message)) || { key: null }
        const response = key || null
        resolve(response);

    }
});


const reply = (step) => new Promise((resolve, reject) => {
    if (process.env.DATABASE === 'none') {
        let resData = { replyMessage: '', media: null }
        const responseFind = stepsReponse[step] || {};
        resData = {
            ...resData,
            ...responseFind,
            replyMessage: responseFind.replyMessage.join('')
        }
        resolve(resData);
        return
    }
});

/**
 * 
 * Save mensaje, create a historial 
 */
const saveMessage = (message, number) => new Promise(async (resolve, reject) => {
    resolve(await saveMessageJson(message, number));
    return
});
//when using dialogflow
const getIA = (message) => new Promise((resolve, reject) => {

    if (process.env.DATABASE === 'dialogflow') {
        let resData = { replyMessage: '', media: null, trigger: null }
        getDataIa(message, (dt) => {
            resData = { ...resData, ...dt }
            resolve(resData)
        })
    }
});

module.exports = { get, reply, saveMessage, getIA }