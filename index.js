const Discord = require('discord.js');
const Database = require("@replit/database");
const db = new Database();

const bot = new Discord.Client();

bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.username}`);
});

// pluto id = 207604572166815744
bot.on('message', msg => {
    const pluto = bot.users.cache.get('207604572166815744');

    if(msg.author !== pluto) return;

    msg.reply('U aimbot');
});


db.get('token').then(value => {
	bot.login(value);
});
