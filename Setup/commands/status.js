exports.run = (Bot, message, args) => {
  Bot.sql.get(`SELECT * FROM tickets WHERE (ServerId, userId) = (?, ?)`, [message.guild.id, message.author.id]).then(ticket => {
      if (typeof ticket !== "undefined") {
        message.reply({
          embed: {
            title: `Ticket for ${message.author.username}:`,
            fields: [{
                name: "Problem",
                value: ticket.problem
              },
              {
                name: "Status",
                value: ticket.status
              },
              {
                name: "Created By",
                value: ticket.creator
              },
              {
                name: "Created On",
                value: ticket.date
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: Bot.user.avatarURL,
              text: Bot.user.username
            }
          }
        });
      } else {
        message.reply("You don't have any open tickets!");
      }
    }).catch();
};
