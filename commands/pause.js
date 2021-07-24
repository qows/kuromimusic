const Discord = require("discord.js")
module.exports = {
    name: "pause",
    aliases: ["pause", "hold"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        const embedd = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("Theres nothing in the queue")
            .setColor('#009BFF')
        if (!queue) return message.channel.send(embedd)
        if (queue.pause) {
            client.distube.resume(message)
            const embed = new Discord.MessageEmbed()
                .setTitle("Kuromi")
                .setDescription("Resumed the song")
                .setColor('#009BFF')
            return message.channel.send(embed)
        }
        client.distube.pause(message)
        const embeddd = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("Paused the song")
            .setColor('#009BFF')
        message.channel.send(embeddd)
    }
}
