const Discord = require('discord.js');
const Config = require('./config.js');
const chalk = require('chalk');
const Database = require('./Setup/database/db.js');
const express = require('express');
const app = express();

const helmet = require('helmet');
const exphbs = require('express-handlebars');

// Creating the discord client
const client = new Discord.Client();

// Attaching the sqlite database to the client
client.sql = Database.sql;
client.database = Database;

// Attaching the config to the client
client.config = Config;

client.on('ready', () => {
  console.log(chalk.bgBlue.white(`Logged in as ${client.user.tag}\n${client.guilds.size} servers!`));


  client.user.setActivity(`${Config.Prefix}help`, {
    type: "LISTENING"
  });

  // Creating the tables for the database
  client.sql.run(`CREATE TABLE IF NOT EXISTS tickets (ServerId TEXT, userId TEXT, userName TEXT, status TEXT, problem TEXT, date TEXT, creator TEXT)`);
});

client.on('message', function(message) {
  // Don't listen to a bot!!
  if (message.author.bot) return;
  // If the guild/server isn't available
  if (message.guild.available != true) return;

  // If message didn't start with the prefix, then stop it here
  if (!message.content.toLowerCase().startsWith(client.config.Prefix)) return;

  // Removes the prefix from the message, before "slicing" it up to an array ['like', 'this']
  const args = message.content.slice(client.config.Prefix.length).trim().split(/ +/g);
  // The command
  const command = args.shift().toLowerCase();


  try {

    let fetchCommand = require(`./Setup/commands/${command}.js`);
    fetchCommand.run(client, message, args);

  } catch (err) {
    // Failed to get the command
    console.error(err);
  }
});

// Logging in to the client with the token
client.login(Config.Token);

// View Engine
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

//Helmet Security
app.use(helmet());

app.get('/', (req, res) => {
  client.sql.all(`SELECT * FROM tickets`).then((tickets) => {
    res.render('tickets', { tickets: tickets });
  }).catch();
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(Config.webport);
console.log('[!] Website server is online.');
