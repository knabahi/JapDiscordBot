const fetch = require('node-fetch');
module.exports = {
	name: 'duck',
	description: 'Get a random duck image',
	guildOnly: true,
    cooldown: 2,
	async execute(message, args) {
        const { url } = await fetch('https://random-d.uk/api/v2/quack').then(response => response.json());
        
        message.channel.send(url);
	},
};
