const Discord = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Calls a friend to play {GAME}',
    usage: '[play <game_name> @friend]',
    cooldown: 3,
    async execute(message, args) {
        if(!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to call them!');
        }

        const taggedUser = message.mentions.users.first();
        const embed = new Discord.MessageEmbed();

        if(args[0] === 'bdo') {
            embed.setColor("DARK_BUT_NOT_BLACK")
                .setTitle("Calling of BDO")
                .setThumbnail("https://image.winudf.com/v2/image1/Y29tLmthc2FuZW50LmJkb190b29sc19pY29uXzE1ODEzODMzNjZfMDk0/icon.png?w=170&fakeurl=1");

            if(taggedUser.username === 'rafallis') {
                embed.setDescription(`Sorry, but ${taggedUser} do not play BDO.`)
            } else {
                embed.setDescription(`Hey <@${taggedUser.id}> lets to play BDO`);
            }
        } else if (!message.content) {
            embed.setColor("DARK_BUT_NOT_BLACK")
                .setTitle("NO GAME")
                .setDescription("Sorry, but you don't inserted any game.");
        } else {
            embed.setColor("BLUE")
                .setTitle(`Come to ${args[0]}`)
                .setDescription(`${taggedUser} come to play ${args[0]}`)
                .setThumbnail("https://www.einerd.com.br/wp-content/uploads/2017/03/photodune-9235903-game-m-16x91-890x501.jpg");
        }
        await message.channel.send(embed);
    }
}