exports.run = (Bot, message, args) => {
  //Check if member has admin perms

  if (Bot.config.staffRoles.indexOf(message.member.highestRole.id) !== -1) {
    //Check if there is a mention
    if (message.mentions.members.size < 1 || !args[1]) {
      message.reply("You forgot to mention someone or set a status!");
    }
    if (message.mentions.members.size > 1) {
      message.reply("You can only mention one user at a time!");
    }
    if (args[1] == "open" || args[1] == "NTR" || args[1] == "NUR") {
      let user = message.mentions.members.id;
      let problem = args.slice(1);
      Bot.sql.get(`SELECT * FROM tickets WHERE (ServerId, userId) = (?, ?)`, [message.guild.id, message.mentions.users.first().id])
        .then(ticket => {
          if (typeof ticket !== "undefined") {
            Bot.sql.run(`UPDATE tickets SET status = "${args[1]}" WHERE UserId = "${ticket.userId}" AND ServerId = "${ticket.ServerId}"`).then(message.reply("Ticket updated")).catch();
          } else {
            message.reply("Ticket not found");
          }
        }).catch();
    } else {
      message.reply("Make sure that status = open, NUR (Needs user response), or NTR (Needs techies response)");
    }
  } else {
    message.reply("Permission Denied");
  }
};
