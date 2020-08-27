module.exports = {
	name: 'bot-link',
	description: 'Get an invite link for the bot',
	guildOnly: true,
    cooldown: 2,
    aliases: ['bl'],
	execute(message, args) {
		
		message.channel.send('https://discordapp.com/oauth2/authorize?client_id=734811465252601908&scope=bot&permissions=8');
	},
};