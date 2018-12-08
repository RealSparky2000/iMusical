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
  if (msg.author.bot) return undefined;

	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');

	const searchString = args.slice(1).join(' ');

	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';

	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];

	command = command.slice(PREFIX.length)

	if (command === 'play') {

		const voiceChannel = msg.member.voiceChannel;

		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');

		const permissions = voiceChannel.permissionsFor(msg.client.user);

		if (!permissions.has('CONNECT')) {

			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');

		}

		if (!permissions.has('SPEAK')) {

			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');

		}
   } 
}) 
client.login(process.env.BOT_TOKEN)
