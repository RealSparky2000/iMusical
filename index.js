const { Client, Util } = require('discord.js') 
const YouTube = require('simple-youtube-api') 
const ytdl = require('ytdl-core') 

const client = new Client({ disableEveryone: true });

const youtube = new YouTube(process.env.GOOGLE_API_KEY);

const queue = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Yo this ready!'));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => { 
}) 
client.login(process.env.BOT_TOKEN)
