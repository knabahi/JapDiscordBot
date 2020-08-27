module.exports = {
	name: 'invite',
	description: 'Get server perma invite link',
	guildOnly: true,
	cooldown: 2,
	execute(message, args) {
		
		message.channel.send('https://discord.gg/ndxXjDK');
	},
};