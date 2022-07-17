const searchMessageJson = async  (number, mens) =>  {
    try {
        const jsondata = require('../chats/' + number + '.json');
        const leng = jsondata['messages'].length;
        const lastmessage = await jsondata['messages'][leng - mens]['message'];
        console.log('holaaa');
        return(lastmessage);
    } catch (error) {
        console.log(error);
        return(error);
    }
};
module.exports = { searchMessageJson }