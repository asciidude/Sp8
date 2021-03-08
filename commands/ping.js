const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['test'],
    description: 'Ping pong!',
    usage: 'ping',
    async execute(message, args, client) {
        const embed = new MessageEmbed()
        .setTitle('Pong! :ping_pong:')
        .addField('Client Latency', `${Date.now() - message.createdTimestamp}ms`, true)
        .addField('API Latency', `${Math.round(client.ws.ping)}ms`, true)
        .setColor('RED')

        message.channel.send(embed);
    }
}