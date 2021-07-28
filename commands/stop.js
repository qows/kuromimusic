const Discord = require("discord.js")
module.exports = {
    name: "stop",
    run: async (client, message, args) => {
        const er = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("You must be inside of a voice channel")
            .setColor('#009BFF')
        if (!message.member.voice.channel) return message.channel.send(er);
        const error = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("You must be inside the same voice channel")
            .setColor('#009BFF')
        if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(error)
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