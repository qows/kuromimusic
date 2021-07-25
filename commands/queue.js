const distube = require('distube')
const { MessageEmbed } = require("discord.js");
module.exports.config = {
    name: "queue",
    aliases: ["q"],
}
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */
module.exports.run = async(client, message, args) =>  {
 const permissions = message.channel.permissionsFor(message.client.user);
    let queue = client.distube.getQueue(message)
    const eb = new MessageEmbed()
        .setTitle("Kuromi")
        .setDescription("Theres nothing in the queue")
        .setColor('#009BFF')
    if (!queue) return message.channel.send(eb);
    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue.songs);
    const queueEmbed = await message.channel.send(
      `Current page - **${currentPage + 1}**/**${embeds.length}**`,
      embeds[currentPage]
    );
    try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("⏹️");
      await queueEmbed.react("➡️");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }
    const filter = (reaction, user) =>
      ["⬅️", "⏹️", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, { time: 30000 });
    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`Current page - **${currentPage + 1}**/**${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`Current page - **${currentPage + 1}**/**${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    });
  }
function generateQueueEmbed(message, queue) {
  let embeds = [];
  let k = 10;
  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;
    const info = current.map((track) => `${++j -1} [**${track.name}**](${track.url})`).slice(1).join("\n");
    const embed = new MessageEmbed()
      .setColor("#009BFF")
      .setTitle("Kuromi")
      .setDescription(`Current song - [**${queue[0].name}**](${queue[0].url})\n\n${info}`)
    embeds.push(embed);
  }
  return embeds;
}
