const Discord = require("discord.js")
module.exports = {
    name: "stop",
    aliases: ["disconnect", "leave"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        const embed = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("Theres nothing playing")
            .setColor('#009BFF')
        if (!queue) return message.channel.send(embed)
        client.distube.stop(message)
        const embedd = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("Stopped the song")
            .setColor('#009BFF')
        message.channel.send(embedd)
    }
}