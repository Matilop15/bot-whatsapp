const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");

const client = new Client({
    authStrategy: new LocalAuth(),
});

let conversacion = new Object();
conversacion.name = "Juan Perez";
conversacion.motivo = "",
    conversacion.born = 0000;


client.initialize();

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
    console.log("AUTHENTICATED");
});

client.on("ready", () => {
    console.log("Client is ready!");
});

//Replying Messages with image from url
client.on("message", async (msg) => {

    console.log('entre');
    const { from, to, body } = msg; //from=remit, to(yo), body=mensaje
    if (body === "meme") {
        //get media from url
        const media = await MessageMedia.fromUrl(
            "https://cnnespanol.cnn.com/wp-content/uploads/2019/07/screen-shot-2019-07-04-at-9.31.04-pm.png"
        );

        //replying with media
        client.sendMessage(from, media, {
            caption: "gracias!!",
        });
    }
    else if (body === "hola" || body === "Hola") {
        const media = await MessageMedia.fromUrl(
            "https://memegenerator.net/img/instances/19334753.jpg"
        );
        client.sendMessage(from, media, {
            caption: "hola!!",
        });
    }
    else if (body === "hello" || body === "Hello") {
        client.sendMessage(from, 'Welcome to Matibot👋, ¿En que te puedo ayudar?.\nElige el número correspondiente a la opción deseada:\n 1- Agenda \n 2- Info \n 3- Música');

    switch (body) {
        case '1':
            client.sendMessage('Podría brindarnos su nombre y apellido para agendarle una cita');
            //espero la respuesta
            // guardar el nombre y apellido cuando llegue

            conversacion.name = body;
            client.sendMessage('¿Cuál es el motivo de su consulta?');

        case '2':
            const media2 = await MessageMedia.fromUrl(
                "https://1.bp.blogspot.com/-kQw78cBMIB0/Wl1s8XCDUrI/AAAAAAAAEoQ/Kwl04DNlHB46BiRG5-eki4RsoOjN9WD0gCLcBGAs/s320/INFOR.jpg"
            );
            client.sendMessage(from, media2, {
                caption: "Gracias por preferirnos",
            });
            break;
        case '3':
            const media3 = await MessageMedia.fromUrl(
                "https://scontent.fmvd1-1.fna.fbcdn.net/v/t39.30808-6/244443629_101596138972213_6429421557788284466_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEm6BPBnDS2VUy9-HGnP_P3FvIBJxayexYW8gEnFrJ7FojdtVDHoofS0aHLogEYeEV4ytLunwud3RR8PFImm41Z&_nc_ohc=86-AfSAn5q8AX-q5yeZ&_nc_pt=1&_nc_ht=scontent.fmvd1-1.fna&oh=00_AT97TqFyXBZHYsIVFHcIlb6e9buptmqlBFtbtFoT1gJMcg&oe=62CE96F1"
            );
            client.sendMessage(from, media3, {
                caption: "Gracias por preferirnos",
            });
            break;
        }   
    }

});