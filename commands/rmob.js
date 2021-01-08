const Discord = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    name: 'rmob',
    description: 'Ragnarok database mob searcher',
    usage: '[rag <type> <name>]',
    cooldown: 1,
    async execute(message, args) {
        const query = args.join(' ');

        try {

            const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Ragna Mob")

            if (isNaN(args)) {
                const {text} = await request
                    .get(`http://localhost:8090/api/mobre/name/${query}`);
                // .query({'filter[text]': query });
                const body = JSON.parse(text);
                const data = body.data;
                if (!data.length) return message.reply('Could not find any results on RAG API.');
                else if (data.length > 1) {
                    embed.setDescription("List of possible items")
                    body.data.forEach(mob => {
                        embed.addField(`ID ${mob.id}`, mob.iName, true);
                    });
                }
                else {
                    embed
                        .setURL(`https://www.divine-pride.net/database/monster/${data[0].id}`)
                        .setDescription(`${data[0].id} - ${data[0].iName}`)
                        .setThumbnail(`https://www.divine-pride.net/img/items/collection/bRO/${data[0].id}`)
                        .addField("LV", data[0].LV, false)
                        .addField("HP", data[0].HP, true)
                        .addField("range", data[0].range1, true);
                    data.forEach(drop => {
                        embed
                            .addField("item 1", `http://localhost:8090/api/itemre/${drop.drop1id}`, true)
                            .addField("item 2", `http://localhost:8090/api/itemre/${drop.drop2id}`, true)
                            .addField("item 3", `http://localhost:8090/api/itemre/${drop.drop3id}`, true);
                    });
                }
            }
            else {
                const {text} = await request
                    .get(`http://localhost:8090/api/mobre/${query}`);

                const data = JSON.parse(text);

                embed
                    .setURL(`https://www.divine-pride.net/database/monster/${data.id}`)
                    .setDescription(`${data.id} - ${data.iName}`)
                    .setThumbnail(`https://static.divine-pride.net/images/mobs/png/${data.id}.png`)
                    .addField("LV", data.lv, false)
                    .addField("HP", data.hp, true)
                    .addField("range", data.range1, true)
                    .addField("atk1", data.atk1, true)
                    .addField("atk2", data.atk2, true)
                    .addField("def", data.def, true)
                    .addField("EXP", data.exp, true);
                    // .addField("item 1", `http://localhost:8090/api/itemre/${data.drop1id}`, true)
                    // .addField("item 2", `http://localhost:8090/api/itemre/${data.drop2id}`, true)
                    // .addField("item 3", `http://localhost:8090/api/itemre/${data.drop3id}`, true);

            }

            return message.channel.send(embed);
        } catch (err) {
            return message.reply(`=( oh shit, an error ocurred: \`${err.message}\`. Try again later!`);
        }
        // await message.channel.send(embed);
    },
}