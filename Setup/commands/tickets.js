const Discord = require('discord.js');
exports.run = (Bot, message, args) => {
  //Check if reason is provided and there is a mention
    Bot.sql.all(`SELECT * FROM tickets WHERE ServerId = ?`, [message.guild.id]).then(rows => {
      let embed = new Discord.RichEmbed();
      embed.setTitle("Current tickets:");
      embed.setTimestamp();
      for (var i = 0, len = rows.length; i < len; i++) {
        let IDToUser = Bot.users.find("id", rows[i].userId);
        embed.addField(`Ticket for: ${IDToUser.username}`, `Problem: ${rows[i].problem}`);
        if (i > 20) {break;}
      }
      message.reply({embed}).catch(console.error());
    }).catch(console.error());
};
