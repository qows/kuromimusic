const Discord = require("discord.js")
module.exports = {
    name: "resume",
    aliases: ["resume", "unpause"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        const embedd = new Discord.MessageEmbed()
            .setTitle("Kuromi Development")
            .setDescription("Theres nothing in the queue")
            .setColor('#009BFF')
        if (!queue) return message.channel.send(embedd)
        client.distube.resume(message)
        const embed = new Discord.MessageEmbed()
            .setTitle("Kuromi Development")
            .setDescription("Resumed the song")
            .setColor('#009BFF')
        message.channel.send(embed)
    }
}
