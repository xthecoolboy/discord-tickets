exports.run = (Bot, message, args) => {
  //Check if reason is provided and there is a mention
  if (message.mentions.members.size < 1 || message.mentions.members.size > 1) {
    message.reply("You forgot to mention someone!").then(msg => msg.delete(5000));
  } else {
    let user = message.mentions.users.first().id;
    Bot.sql.get(`SELECT * FROM tickets WHERE (ServerId, userId) = (?, ?)`, [message.guild.id, user])
    .then((ticket) => {
      if (typeof ticket !== "undefined") {
        message.reply({
          embed: {
            title: `Ticket for ${message.mentions.users.first().username}:`,
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
        message.reply("This user doesn't have any tickets");
      }
    }).catch();
  }
};
