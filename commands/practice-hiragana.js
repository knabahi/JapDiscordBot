const ph = require('../quizzes/ph.json');
module.exports = {
    name: 'practice-hiragana',
    description: 'Get a random hiragana character and answer with correct romaji',
    guildOnly: true,
    cooldown: 2,
    aliases: ['ph'],
    execute(message, args) {
        const item = ph[Math.floor(Math.random() * ph.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase()) && response.author.id === message.author.id;
        };

        message.channel.send(item.question).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} correct!`);
                })
                .catch(collected => {
                    message.channel.send('The Answer is: ' + item.answer);
                });
        });
    },
};