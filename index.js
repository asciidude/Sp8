const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

require('dotenv').config();
client.commands = new Discord.Collection();
const cmds = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

// db
const MongoClient = require('mongodb');
const db = new MongoClient.MongoClient();
db.connect('server', (mongo_client, err) => {
    if(err) {
        console.error(err);
        return;
    }

    console.log(`Successfully connected to database (connected on [PORT: ${process.env.PORT}])`);

    mongo_client.close();
});

// client events
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('you type -help', { type: 'WATCHING' })
        .catch(console.error);
});

for(const f of cmds) {
    const cmd = require(`./commands/${f}`);
    client.commands.set(cmd.name, cmd);
}

client.on('message', message => {
    if (message.author.bot) return;

    if (!message.content.startsWith(process.env.PREFIX)) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if(!cmd) return;

    try {
        cmd.execute(message, args, client);
    } catch(e) {
        message.channel.send(`:x: An unexpected error occured: \n \`\`\`bash \n ${e} \n \`\`\``);
        console.log(e);
    }
});

client.login(process.env.TOKEN);