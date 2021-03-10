// dynamic help command
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    aliases: ['permaban', 'permban'],
    description: 'Ban a user by their mention or ID',
    usage: 'ban (user)',
    async execute(message, args, client) {
        if(!args) {
            for(cmd of client.commands) {
                const embed = new MessageEmbed()
                .setTitle(`Successfully banned ${user}`)
                .setDescription(`**${message.cmd.name}:** ${message.cmd.description}\n`)
                .setColor('RED')
            }

            message.channel.send(embed);

            return;
        }

        const member = await message.guild.members.fetch(args.shift().replace(/[^0-9]/g, ''));
        
        

        try {
            await member.ban({ days: 7 });
            await message.channel.send(`Banned user ${member.user.username}`);

            // if log channel is in db, send embed, otherwise dont
            await message.channel.send(embed);
        } catch(e) {
            console.log(e);
        }
    }
}