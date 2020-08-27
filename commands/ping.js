module.exports = {
	name: 'ping',
	description: 'Ping command',
	guildOnly: true,
	cooldown: 2,
	execute(message, args) {
		
		message.channel.send('pong!');
	},
};