exports.run = (Bot, message, args) => {
  Bot.sql.get(`SELECT * FROM tickets WHERE (ServerId, userId) = (?, ?)`, [message.guild.id, message.author.id])
  .then((ticket) => {
    if (typeof ticket !== "undefined") {
      Bot.sql.run(`DELETE FROM tickets WHERE (ServerId, userId) = (?, ?)`, [message.guild.id, message.author.id])
      .then(message.reply("Ticket resolved, Thanks!")
      ).catch();
    } else {
      message.reply("You don't have an open ticket!");
    }
  }).catch();
};
