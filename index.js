const DisTube = require("distube")
const SpotifyPlugin = require("@distube/spotify")
const Discord = require("discord.js")
const client = new Discord.Client();
const fs = require("fs")    
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnFinish: true, plugins: [new SpotifyPlugin({ parallel: true })] })
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir("./commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!")
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

client.on("ready", () => {
    console.log(`${client.user.tag} is ready to play music.`)
    const server = client.voice.connections.size
})

client.on("message", async message => {
    const prefix = ">"
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    let error = new Discord.MessageEmbed()
        .setColor("#009BFF")
        .setTitle(`Kuromi`)
        .setDescription(`You must be inside of a vc`)
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(error)
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.reply("error")
    }
})
const status = queue => (`Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``)

client.distube

.on("playSong", (message, queue, song) => {
  let playingEmbed = new Discord.MessageEmbed()
    .setColor("#009BFF")
    .setTitle(`Kuromi`)
    .setDescription(`Now playing [**${song.name}**](${song.url})`)
    message.channel.send(playingEmbed)
})
.on("addSong", (message, queue, song) => {
  let songEmbed = new Discord.MessageEmbed()
    .setColor("#009BFF")
    .setTitle(`Kuromi`)
    .setDescription(`Added [**${song.name}**](${song.url}) to the queue`)
    message.channel.send(songEmbed)
})
.on("playList", (message, queue, playlist, song) => {
  let songEmbed = new Discord.MessageEmbed()
    .setColor("#009BFF")
    .setTitle(`Kuromi`)
    .setDescription(`Added [**${playlist.title}**](${playlist.url}) (**${playlist.total_items}** songs) to the queue\nNow playing [**${song.name}**](${song.url})`)
    message.channel.send(songEmbed)
})
.on("addList", (message, queue, playlist) => {
  let songEmbed = new Discord.MessageEmbed()
    .setColor("#009BFF")
    .setTitle(`Kuromi`)
    .setDescription(`Added [**${playlist.title}**](${playlist.url}) (**${playlist.total_items}** songs) to the queue`)
    message.channel.send(songEmbed)
})
client.login(process.env["token"])
