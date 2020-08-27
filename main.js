//Require FS for file searching
const fs = require('fs');
//Require the discord.js module
const Discord = require('discord.js');

//Required files from root dir for commands and options
const { prefix, token } = require('./config.json');

//Create a new Discord client
const client = new Discord.Client();
//Create map to find commands
client.commands = new Discord.Collection();
//Create collection for cooldown data
const cooldowns = new Discord.Collection();

//Return an array of command file names and make sure it ends with .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Require 'command' dir
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);

	//Set a new item in the Collection
	//Key is command name and value as exported module
	client.commands.set(command.name, command);
}

//Runs this code once at start up
client.once('ready', () => {
	console.log('Ready!');
});

//Starts the command handler
client.on('message', message => {
	//Checks if message starts with prefix
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	//Create arg var
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	//Check for command and it's aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) return;

	//Check if command was executed in guild
	if(command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	//Check for args
	if(command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if(command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	//Command cooldown handler
	if(!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	
	if(timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		
		if(now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}		
	}

	//Delete cooldown message on error
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	//If command present in 'commands' dir then run command
	try {
		command.execute(message, args);
	} catch(error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

//Bot token taken from config.json file
client.login(process.env.token);