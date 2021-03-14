const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

exports.run = async (client, message, args) => {
    let shout;
    try {
        shout = await roblox.getShout(Number(process.env.groupId));
    } catch (err) {
        console.log(chalk.red('# COMMAND ERROR #: error occurred running CLEARSHOUT.JS: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
            description: `error code: nil. check the bot console for more info.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
  if(shout.body){
    message.channel.send({embed: {
        color: 7948427,
        description: `**posted by ${shout.poster.username}**\n${shout.body}`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${shout.poster.username}`
        }
    }});
  } else {
        message.channel.send({embed: {
        color: 7948427,
        description: `**${shout.poster.username}**\n* cleared shout.*`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${shout.poster.username}`
        }
    }});
  }
}
