const { Client, Util } = require('discord.js') 

const client = new Client({ disableEveryone: true });
client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Yo this ready!'));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => { 
}) 
client.login(BOTTOKEN)
