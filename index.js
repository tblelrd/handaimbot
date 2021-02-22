const Discord = require('discord.js');
const http = require('http');
const Database = require('@replit/database');

const { reactions, replies, whitelist } = require('./data');

const db = new Database();
const bot = new Discord.Client();

bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.username}`);
    bot.startDate = Date.now();
});

// pluto id = 207604572166815744
// hoovert's id = 496722404165550080
bot.on('message', async msg => {

    if(msg.author.id == 207604572166815744) {
        if(msg.content.startsWith('??add')) {
            const victim = msg.mentions.users.first();
            if(!victim) return msg.reply('U need to @ someone');
            whitelist.push(victim.id);
            msg.reply(`${victim} has been added to the whitelist`);
        } else if(msg.content.startsWith('?remove')) {
            const victim = msg.mentions.users.first();
            if(!victim) return msg.reply('U need to @ someone');
            const i = whitelist.indexOf(victim.id);
            if(i >= 0) whitelist.splice(i, 1);
            msg.reply(`${victim} has been removed to the whitelist`);
        }
    }

    for (const id of whitelist) {
        if(msg.author.id.toString() == id && !msg.content.startsWith('??test')) {
            msg.reply(replies[Math.floor(Math.random() * replies.length)]);
            await msg.react(reactions[Math.floor(Math.random() * reactions.length)]);
        }
    }

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