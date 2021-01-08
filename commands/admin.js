const Discord = require('discord.js');

module.exports = {
    name: 'admin',
    description: 'ADMIN',
    usage: '[rag <type> <name>]',
    cooldown: 1,
    async execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Admin Use")
            .setThumbnail("https://loja.levelupgames.com.br/Content/img/jogo-interna/ragnarok-warpportal/logo-ragnarok-warpportal.png")
            .setDescription("This command is under construction. Be patience :wink:");

        await message.channel.send(embed);
    }
}