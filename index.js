const Discord = require('discord.js');
const http = require('http');
const Database = require('@replit/database');
const db = new Database();

const bot = new Discord.Client();

bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.username}`);
});

// pluto id = 207604572166815744
bot.on('message', async msg => {
    const pluto = bot.users.cache.get('207604572166815744');

    if(msg.author !== pluto) return;

    msg.reply('U aimbot');
    await msg.react('🍆');
    await msg.react('🤤');
    await msg.react('👌');
});


db.get('token').then(value => {
	bot.login(value);
});
let connectedAmount = 0;
const server = http.createServer((req, res) => {
    const hour = Math.floor((Date.now() - bot.startDate) / 1000 / 60 / 60);
    const min = Math.floor((Date.now() - bot.startDate) / 1000 / 60);
    const sec = Math.floor((Date.now() - bot.startDate) / 1000);
    res.writeHead(200);
    res.end('Pinged: ' + connectedAmount.toString() + '\n' +
     `Bot running for ${hour.toString()}:${(min - (hour * 60)).toString()}.${(sec - (min * 60)).toString()} (Hour:Min.Sec)`);
});

server.on('connection', () => {
    connectedAmount++;
});
server.listen(3000);