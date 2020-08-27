module.exports = {
	name: 'ghost-ping',
	description: 'Ghost-ping command',
	guildOnly: true,
    cooldown: 2,
    aliases: ['gp'],
	execute(message, args) {
        message.channel.send('@everyone').then(msg => {
            message.channel.bulkDelete(2, true).catch(err => {
                console.error(err)
            });
        });
	},
};