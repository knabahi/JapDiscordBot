const Discord = require('discord.js');
const querystring = require('querystring');
const fetch = require('node-fetch');
module.exports = {
	name: 'urban-dictionary',
	description: 'Get an urban dictionary definition',
	guildOnly: true,
    cooldown: 2,
    aliases: ['ud'],
	async execute(message, args) {
		const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        if(!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if(!list.length) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}

		const [answer] = list;

		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.setAuthor('Urban Dictionary', 'https://image.winudf.com/v2/image/aW5mby50dW9odWFuZy51cmJhbmRpY3RfaWNvbl8yZXNhbXd4Yw/icon.png?w=170&fakeurl=1', 'https://www.urbandictionary.com/')
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) },
				{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
            );
            
		message.channel.send(embed);
	},
};
