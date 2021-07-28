const Discord = require("discord.js")
module.exports = {
    name: "play",
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
        const string = args.join(" ")
        const embed = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("Invalid usage please enter a song url or query to search")
            .setColor('#009BFF')
        if (!string) return message.channel.send(embed)
        try {
            client.distube.play(message, string)
        } catch (e) {
            message.channel.send(`error`)
        }
    }
}
