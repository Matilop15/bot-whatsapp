# <img src="./img/logobot.png" width="50">  Whatsapp Chatbot

Whatsapp Chatbot develop as a simple save the date clone to get vaccinated.

## Tecnologies

<img src="./img/node-js.png" width="150">
<img src="https://roi4cio.com/uploads/roi/company/Dialogflow_logo.png" width="150">

## How to use it

- First clone this repository.
- Rename the file .env.config to .env and select and select the flow option to use `none(json)` or `dialogflow`
- If you are going to use dialogflow, you must put the access keys in chatbot-account.json file. Watch this video: https://www.youtube.com/watch?v=dFN79tEr_bc&ab_channel=RajKapadia
- If you are going to use Mongodb Atlas for saving the messages, you must put your password and database name in mongoose.connect. Watch this blog: https://hevodata.com/learn/mongodb-atlas-nodejs/
- run `node start`
- The first time, scan qr code on console or http://localhost:3000/qr
- Wait for the messages 
- If you have two mobiles, you can send a messages and test the responses.

## File description

File | Description |
---- | ----------- | 
[app.js](./app.js) | Core of the program, create user session, manage the flow
[.env.config](./env.config) | Enviroment configuration
[chatbot-account.json](./chatbot-account.json) | Keys to connect with dialogflow
[dialogflow.js](./adapter/dialogflow.js) | manage the dialogflow connection
[index.js](./adapter/index.js) | Data management and the different stages
[jsonDn.js](./adapter/jsonDb.js) | Saving messages in json file
[agendar.js](./controllers/agendar.js/) | Some stages of the agenda adn email validator
[handle.js](./controllers/handle.js) | Clean phone number extension and generate qr image
[searchLast.js](./controllers/searchLast.js/) | Search the last message in json file
[send.js](./controllers/send.js/) | Send the messages
[web.js](./controllers/web.js) | """"REVISAR"""""""
[initialflow.json](./flow/initialflow.json/) | Keywords and keys for the different stages
[response.json](./flow/response.json) | Text for reply messages

## Workflow

for create wpp client, I used ->
https://github.com/pedroslopez/whatsapp-web.js

bibliografia ->

https://www.npmjs.com/
https://wwebjs.dev/guide/ --> whatsapp nodejs
https://www.w3schools.com/js/default.asp
https://www.geeksforgeeks.org/javascript/?ref=lbp
https://www.youtube.com/watch?v=dkic3MU3858&list=PL_wRgp7nihybJkFgDxd-LBZgmSIVdy3rd&ab_channel=UskoKruM2010
https://stackoverflow.com/
https://www.youtube.com/watch?v=lf_oFEqxxbs&list=PL_wRgp7nihyYdnV6ilQcZsfdG5d2nGWkc&ab_channel=UskoKruM2010
https://askavy.com/
https://dev.to/emmanuelthecoder/tutorial-create-a-whatsapp-bot-using-nodejs-and-puppeteer-1fn7
https://www.youtube.com/watch?v=dFN79tEr_bc&ab_channel=RajKapadia


## AUTHOR
[**Matias López**](https://www.linkedin.com/in/matiaas-lopez/)