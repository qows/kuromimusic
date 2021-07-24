const Discord = require("discord.js")
module.exports = {
    name: "play",
    aliases: ["p"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
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
