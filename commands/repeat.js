const Discord = require("discord.js")
module.exports = {
    name: "repeat",
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
        const embedd = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("Theres nothing playing")
            .setColor('#009BFF')
        if (!queue) return message.channel.send(embedd)
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = client.distube.setRepeatMode(message, mode)
        mode = mode ? mode === 2 ? "queue" : "song" : "Off"
        const embed = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription(`Repeat mode set **${mode}**`)
            .setColor('#009BFF')
        message.channel.send(embed)
    }
}
