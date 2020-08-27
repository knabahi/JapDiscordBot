const pk = require('../quizzes/pk.json');
module.exports = {
	name: 'practice-katakana',
	description: 'Get a random katakana character and answer with correct romaji',
	guildOnly: true,
    cooldown: 2,
    aliases: ['pk'],
	execute(message, args) {
        const item = pk[Math.floor(Math.random() * pk.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) && response.author.id === message.author.id;
        };
        
        message.channel.send(item.question).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} correct!`);
                })
                .catch(collected => {
                    message.channel.send('Looks like you\'re stupid');
                });
        });
	},
};
