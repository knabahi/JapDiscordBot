const Discord = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Get user avatar or mentioned user avatar',
	usage: '<user>',
	guildOnly: true,
	cooldown: 2,
	aliases: ['icon', 'pfp'],
	execute(message, args) {
		const embed = new Discord.MessageEmbed()
		if(!message.mentions.users.size) {
			embed.setColor('#9900cc')
			embed.setTitle('Your Avatar!')
			embed.setURL(message.author.displayAvatarURL({ format: "png", dynamic: true }) + '?size=2048')
			embed.setImage(message.author.displayAvatarURL({ format: "png", dynamic: true }) + '?size=2048')
			embed.setTimestamp();
			return message.channel.send(embed);
		}

		let user = message.mentions.users.first();

		embed.setColor('#000000')
		embed.setTitle(`${user.username}'s Avatar!`)
		embed.setURL(user.displayAvatarURL({ format: "png", dynamic: true }) + '?size=2048')
		embed.setImage(user.displayAvatarURL({ format: "png", dynamic: true }) + '?size=2048')
		embed.setTimestamp();
		return message.channel.send(embed);
		
		message.channel.send(embed);
	},
};