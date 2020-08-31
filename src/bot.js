require('dotenv').config();

const { Client, WebhookClient } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
});

const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN
);
const PREFIX = '$';

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    console.log(CMD_NAME);
    console.log(args);

    if (CMD_NAME === 'kick') {
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply(
          'Im sorry, you do not have permission to use that command'
        );
      if (args.length === 0) return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked!`))
          .catch((err) =>
            message.channel.send('I do not have permissions to do that :(')
          );
      } else {
        message.channel.send('That member wasnt found');
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply(
          'Im sorry, you do not have permission to use that command'
        );
      if (args.length === 0) return message.reply('Please provide an ID');

      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User was successfullly banned');
        console.log(user);
      } catch (err) {
        message.channel.send(
          'An error occured. Either I do not have permission or the user was not found :S'
        );
      }
    } else if (CMD_NAME === 'announce') {
      console.log(args);
      const msg = args.join(' ');
      console.log(msg);
      webhookClient.send(msg);
    }
  }

  // console.log(`[${message.author.tag}]: ${message.content}`);
});

client.on('messageReactionAdd', (reaction, user) => {
  console.log('Hello!');
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === 750014082471690350) {
    switch (name) {
      case '🍎':
        member.roles.add('750015873246298182');
        break;
      case '🍌':
        member.roles.add('750015958235611316');
        break;
    }
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  console.log('Hello!');
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === 750014082471690350) {
    switch (name) {
      case '🍎':
        member.roles.remove('750015873246298182');
        break;
      case '🍌':
        member.roles.remove('750015958235611316');
        break;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
