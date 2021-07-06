const Axios = require("axios");
const Discord = require("discord.js");
const { api_currency_key } = require('../config.json');
require( 'console-stamp' )( console );

BASE_URL = "https://free.currconv.com/api/v7/"

module.exports = {
    name: 'curr',
    description: 'Currency converter!',
    cooldown: 5,
    usage: '*<Incomming_Currency_Code> <Destination_Currency_Code> <Value_to_Convert>*',
    async execute(message, args) {
        const data = [];
        const source = args[0].toUpperCase();
        const destination = args[1].toUpperCase();
        const value = args[2];

        const query = `${source}_${destination}`;
        const currency = Axios.get(`${BASE_URL}convert?q=${query}&compact=ultra&apiKey=${api_currency_key}`);

        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Converter")
            .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/81-yKbVND-L.png")
            .setURL("https://pt.wikipedia.org/wiki/ISO_4217")

        currency.then(res => {
            let newValue = Object.values(res.data)[0] * value;
            newValue = newValue.toFixed(3).toString();
            data.push("Currency rate: ");
            data.push(newValue);

            embed
                .setDescription(`Converted from ${source} to ${destination}`)
                .addFields(
                    {name: 'Inserted value', value: `${source} ${value}`, inline: true},
                    {name: 'Rate', value: `${Object.values(res.data)[0]}`, inline: true},
                    {name: 'Coverted value', value: `${destination} ${newValue}`, inline: false},
                )
            message.channel.send(embed);

        });
    },
};
