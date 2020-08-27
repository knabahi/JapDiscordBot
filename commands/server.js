module.exports = {
	name: 'server',
	description: 'Get server info',
	guildOnly: true,
	cooldown: 2,
	execute(message, args) {
		
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};