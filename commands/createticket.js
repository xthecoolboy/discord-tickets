const moment = require('moment-timezone');
exports.run = (Bot, message, args) => {
  //Check if member has admin perms

  if (Bot.config.staffRoles.indexOf(message.member.highestRole.id) !== -1) {
    //Check if reason is provided and there is a mention
    if (message.mentions.members.size < 1 || !args[1]) {
      message.reply("You forgot to mention someone or there is no reason!").then(msg => msg.delete(5000));
      return;
    }
    if (message.mentions.members.size > 1) {
      message.reply("You can only mention one user at a time!").then(msg => msg.delete(5000));
      return;
    } else {
      let currentDate = moment();
      let timezone = currentDate.tz('America/Chicago').format('MMMM Do YYYY, h:mm:ss a z');
      let user = message.mentions.users.first();
      let problem = args.slice(1).join(" ");
      Bot.sql.get(`SELECT * FROM tickets WHERE (ServerId, userId) = (?, ?)`, [message.guild.id, user])
      .then((ticket) => {
        if (typeof ticket === "undefined") {
          Bot.sql.run(`INSERT INTO tickets (ServerId, userId, userName, status, problem, date, creator) VALUES (?, ?, ?, ?, ?, ?, ?)`, [message.guild.id, user.id, user.username, "open", problem, timezone, message.author.username])
          .then(message.reply(`Ticket created for ${message.mentions.users.first().username} with problem: ${problem}`)).catch();
        } else {
          message.reply(`${message.mentions.users.first().username} already has an open ticket!`);
        }
      }).catch();
    }
  } else {
    message.reply("Permission Denied");
  }
};
