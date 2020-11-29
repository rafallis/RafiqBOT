const request = require('node-superfetch')
const Discord = require("discord.js")
const utility = require("../helpers/utility")

module.exports = {
    name: 'anime',
    description: 'Search for Anime info',
    usage: '[anime Name]',
    async execute(message, args) {
        const query = args.join(' ');

        try {
            const {text} = await request
                .get('https://kitsu.io/api/edge/anime')
                .query({ 'filter[text]': query });

            const body = JSON.parse(text);
            if(!body.data.length) return message.reply('Could not find any results.');
            const data = body.data[0].attributes;
            const embed = new Discord.MessageEmbed()
                .setColor(0xF75239)
                .setAuthor(`Kitsu.io`, 'https://kitsu.io/kitsu-256-ed442f7567271af715884ca3080e8240.png', 'https://kitsu.io/explore/anime')
                .setURL(`https://kitsu.io/anime/${data.slug}`)
                .setTitle(data.canonicalTitle)
                .setDescription(utility.shorten(data.synopsis))
                .setThumbnail(data.posterImage ? data.posterImage.original : null)
                .addField(':paperclip: Type', `${data.subtype}`, true)
                .addField(':hourglass: Status', `${data.status}`, true)
                .addField(':calendar_spiral: Production', 'from **' + (data.startDate ? data.startDate : '???') + '** to **' + (data.endDate ? data.endDate : '???') + '**', false)
                .addField(':minidisc: Episodes', data.episodeCount || '???', true)
                .addField(':clock: Ep. Duration', data.episodeLength + 'min', true)
                .addField(':star: Average Rating', '**' + data.averageRating + '/100 **', true)
                .addField(':trophy: Rank', 'TOP ' + data.ratingRank, false);
            return message.channel.send(embed);
        } catch (err) {
            return message.reply(`=( oh shit, an error ocurred: \`${err.message}\`. Try again later!`);
        }
    },
};