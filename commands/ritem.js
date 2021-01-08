const Discord = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    name: 'ritem',
    description: 'Ragnarok database item searcher',
    usage: '[ritem <name>]',
    cooldown: 1,
    async execute(message, args) {
        const query = args.join(' ');

        try {
            const {text} = await request
                .get(`http://localhost:8090/api/itemre/bname/${query}`);
                // .query({'filter[text]': query });

            const body = JSON.parse(text);
            const data = body.data;

            const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Ragna Item")

            if (!data.length) return message.reply('Could not find any results on RAG API.');
            else if (data.length > 1) {
                embed.setDescription("List of possible items")
                body.data.forEach(item => {
                    embed.addField(`ID ${item.id}`, item.name_brazilian, true);
                });
            }
            else {
                embed
                    .setURL(`https://www.divine-pride.net/database/item/${data[0].id}`)
                    .setDescription(`${data[0].id} - ${data[0].name_brazilian}`)
                    .setThumbnail(`https://www.divine-pride.net/img/items/collection/bRO/${data[0].id}`)
                    .addField("Name English", data[0].name_english, false)
                    .addField("weight", data[0].weight, true)
                    .addField("atk", data[0].atk, true)
                    .addField("matk", data[0].matk, true)
                    .addField("defence", data[0].defence, true)
                    .addField("range", data[0].range, true)
                    .addField("min level", data[0].equipLevelMin, true)
                    .addField("locations", data[0].equip_locations, false);
            }

            // const data = body.data[0];
            //
            // console.log('tamanho da caraia');
            // console.log(Object.keys(data).length);
            //
            // const embed = new Discord.MessageEmbed()
            //     .setColor("BLUE")
            //     .setTitle("Ragna Item")
            //     // .setThumbnail('../assets/images/admin_doggo.png')
            //     .setDescription(data.name_brazilian);
            return message.channel.send(embed);
        } catch (err) {
            return message.reply(`=( oh shit, an error ocurred: \`${err.message}\`. Try again later!`);
        }
        // await message.channel.send(embed);
    },
}