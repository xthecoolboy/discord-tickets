const Config = require('../../config.js');
exports.run = (Bot, message, args) => {
  //Just sends an embed to the Channel and deletes it afterwards
  message.channel.send("", {
    embed: {
      "title": `${Bot.user.username}'s Help!`,
      "description": `"${Config.Prefix}help" - Displays this help\n` +
        `"${Config.Prefix}status" - shows the status of a user ticket\n` +
        `"${Config.Prefix}resolve" - Closes a Ticket\n` +
        `"${Config.Prefix}tickets" - Lists all tickets\n` +
        `"${Config.Prefix}ticket <mention>" - Will bring up a specific users ticket\n` +
        `"${Config.Prefix}createticket <mention> <Problem>" - Creates a ticket titled @<mention>\n` +
        `"${Config.Prefix}setstatus <mention> <status>" - Sets a tickets status\n`
    }
  });
};
