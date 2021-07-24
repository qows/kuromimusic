const Discord = require("discord.js")
module.exports = {
    name: "volume",
    aliases: ["v", "set", "set-volume"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        const embeddd = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("Theres nothing in the queue")
            .setColor('#009BFF')
        if (!queue) return message.channel.send(embeddd)
        const volume = parseInt(args[0])
        const embedd= new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("Invalid number")
            .setColor('#009BFF')
        if (isNaN(volume)) return message.channel.send(embedd)
        client.distube.setVolume(message, volume)
        const embed = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription(`Volume set **${volume}%**`)
            .setColor('#009BFF')
        message.channel.send(embed)
    }
}
