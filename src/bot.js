require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = '$';

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in`);
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    console.log(CMD_NAME);
    console.log(args);

    if (CMD_NAME === 'kick') {
      if (args.length === 0) return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member.kick();
      } else {
        message.channel.send('That member wasnt found');
      }
    } else if (CMD_NAME === 'ban') {
      message.channel.send('The user has been banned');
    }
  }

  console.log(`[${message.author.tag}]: ${message.content}`);
  if (message.content === 'hello') {
    message.channel.send('hello there');
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
