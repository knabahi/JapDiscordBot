module.exports = {
	name: 'test',
	description: 'Test command',
	guildOnly: true,
	cooldown: 2,
	execute(message, args) {
		
		message.channel.send('No testing being done');
	},
};
