const Discord = require("discord.js")
module.exports = {
    name: "queue",
    aliases: ["q"],
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        const embed = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription("Theres nothing playing")
            .setColor('#009BFF')
        if (!queue) return message.channel.send(embed)
        const q = queue.songs.map((song, i) => `${i === 0 ? "" : `${i}`} [**${song.name}**](${song.url}) | \`${song.formattedDuration}\``).join("\n")
        const embedd = new Discord.MessageEmbed()
            .setTitle("Kuromi")
            .setDescription(`${q}`)
            .setColor('#009BFF')
        message.channel.send(embedd)
    }
}
