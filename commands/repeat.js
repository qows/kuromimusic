const Discord = require("discord.js")
module.exports = {
    name: "repeat",
    aliases: ["loop", "rp"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
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
