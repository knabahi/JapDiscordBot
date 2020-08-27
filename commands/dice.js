module.exports = {
	name: 'dice',
    description: 'Roll a die',
    usage: '<num>',
	guildOnly: true,
	cooldown: 2,
	aliases: ['d'],
	execute(message, args) {
        const amount = parseInt(args[0]);
        if(args.length < 1){
            return message.channel.send('Please provide a number for your dice roll')
        }

        message.channel.send(Math.floor(Math.random() * amount) + 1);
	},
}