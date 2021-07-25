
const distube = require('distube')
const { MessageEmbed } = require("discord.js");
module.exports.config = {
    name: "queue"
}
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */
module.exports.run = async(client, message, args) =>  {
 const permissions = message.channel.permissionsFor(message.client.user);
    if (!permissions.has(["ADD_REACTIONS", "MANAGE_MESSAGES"]))
      return message.channel.send(`i need add_reactions permissions`);
    let queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`there is nothing in the queue`);
    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue.songs);
    const queueEmbed = await message.channel.send(
      `**Current Page - ${currentPage + 1}/${embeds.length}**`,
      embeds[currentPage]
    );
    try {
      await queueEmbed.react(":arrow_left:");
      await queueEmbed.react(":stop_button:");
      await queueEmbed.react(":arrow_right:");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }
    const filter = (reaction, user) =>
      [":arrow_left:", ":stop_button:", ":arrow_right:"].includes(reaction.emoji.name) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, { time: 30000 });
    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === ":arrow_right:") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === ":arrow_left:") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
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
    const info = current.map((track) => `**${++j -1}.** [${track.name}](${track.url}) - \`${track.formattedDuration}\``).slice(1).join("\n");
    const embed = new MessageEmbed()
      .setColor("#69919D")
      .setDescription(`**Current Song - [${queue[0].name}](${queue[0].url})**\n\n${info}`)
    embeds.push(embed);
  }
  return embeds;
}
