const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["rankingperms", "shoutperms"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
            description: "403: access denied. (missing required role: 'rankingperms' or 'shoutperms')",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let msg = args.join(' ');
    if(!msg){
        return message.channel.send({embed: {
            color: 16733013,
            description: `missing required argument: SHOUT`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let shoutResponse;
    try {
        shoutResponse = await roblox.shout(Number(process.env.groupId), msg);
    } catch (err) {
        console.log(chalk.red('unknown error: ' + err));
        return message.channel.send({embed: {
            color: 16733013,
            description: `error code: nil. check the bot console for more info.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    message.channel.send({embed: {
        color: 9240450,
        description: `group shout posted:\n`
        + `\`\`\`${msg}\`\`\``,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
    if(process.env.logchannelid === 'false') return;
    let logchannel = message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 2127726,
        description: `<@${message.author.id}> posted group shout:\n`
        + `\`\`\`${msg}\`\`\``,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'action logs'
        },
        timestamp: new Date()
    }});
}
