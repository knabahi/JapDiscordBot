module.exports = {
	name: 'me',
	description: 'Get user info',
	guildOnly: true,
	cooldown: 2,
	aliases: ['info'],
	execute(message, args) {
		
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};