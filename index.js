const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = '1670173572:AAHSnepoAEksiz0isDSZ2QgTxe_5X9xRdx8';

//ideal é usar o webhook no lugar do polling
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);
    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;

    if (dfResponse.intent === 'Busca Video PHP') {
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.php8.stringValue)
    }

    bot.sendMessage(chatId, responseText);

})
