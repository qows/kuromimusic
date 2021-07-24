const Discord = require("discord.js")
module.exports = {
    name: "skip",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        const eb = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("Theres nothing in the queue")
            .setColor('#009BFF')
        if (!queue) return message.channel.send(eb)
        try {
            client.distube.skip(message)
        } catch (e) {
            message.channel.send("error")
        }
    }
}
