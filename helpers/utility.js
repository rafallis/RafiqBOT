const request = require('node-superfetch')
const Discord = require('discord.js')

module.exports = {
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    shorten(text, maxLen=600) {
        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
    },

    getUserFromMention(mention) {
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;
        const id = matches[1];
        return client.users.cache.get(id);
    }
}