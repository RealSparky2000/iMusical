const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const YouTube = require('simple-youtube-api') ;
const youtube = new YouTube(ключ типо да);
exports.run = async (client, message, args, ops, queue) => {
    var voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send(':no_entry: `I\'m sorry but you need to be in a voice channel to play music!`');
		var permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send(':no_entry: `I cannot connect to your voice channel, make sure I have the proper permissions!`');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send(':no_entry: `I cannot speak in this voice channel, make sure I have the proper permissions!`');
		}
    if (!args[1]) {
      message.channel.send(':warning: `Please, type name of your song!`')
        return;
    }
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			var playlist = await youtube.getPlaylist(url);
			var videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					var index = 0;
					message.channel.send(`
:mag_right: \`Song selection:\`
**= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = **
${videos.map(video2 => `**[${++index}] -** ${video2.title}`).join('\n')}
**= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = **
:inbox_tray: \`Please, provide a value to select one of the search results ranging from 1-10.\`
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send(`No or invalid value entered, cancelling video selection.`);
					}
					var videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send(

						`I could not obtain any search results.`);
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
}
