const Discord = require("discord.js")
module.exports = {
    name: "volume",
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
