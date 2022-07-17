
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
const ExcelJS = require('exceljs');
const { cleanNumber } = require('./handle')
const DELAY_TIME = 170; //ms
const DIR_MEDIA = `${__dirname}/../mediaSend`;
const { saveMessage } = require('../adapter');
/**
 * Enviamos archivos multimedia a nuestro cliente
 * @param {*} number 
 * @param {*} fileName 
 */

const sendMedia = async (client, number, fileName) => {
    number = cleanNumber(number)
    const media = await MessageMedia.fromUrl(fileName);
    client.sendMessage(number, media);
}

/**
 * Enviamos un mensaje simple (texto) a nuestro cliente
 * @param {*} number 
 */
const sendMessage = async (client, number = null, text = null) => {
    setTimeout(async () => {
        number = cleanNumber(number);
        const message = text
        console.log('mensaje' + message + '\n');
        client.sendMessage(number, message);
    }, DELAY_TIME)
}

/**
 * Opte
 */
const lastTrigger = (number) => new Promise((resolve, reject) => {
    number = cleanNumber(number);
    const pathExcel = `${__dirname}/../chats/${number}.xlsx`;
    const workbook = new ExcelJS.Workbook();
    if (fs.existsSync(pathExcel)) {
        workbook.xlsx.readFile(pathExcel)
            .then(() => {
                const worksheet = workbook.getWorksheet(1);
                const lastRow = worksheet.lastRow;
                const getRowPrevStep = worksheet.getRow(lastRow.number);
                const lastStep = getRowPrevStep.getCell('C').value;
                resolve(lastStep)
            });
    } else {
        resolve(null)
    }
})
/**
 * Guardar historial de conversacion 
 */
 const saveChat = async (number, message) => {
    number = cleanNumber(number)
    await saveMessage( message, number )
    console.log('Saved')
}

module.exports = { sendMessage, sendMedia, lastTrigger, saveChat }