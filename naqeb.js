const Discord = require("discord.js");
const naqeb = new Discord.Client();
const invites = {};
const wait = require("util").promisify(setTimeout);
const moment = require("moment");
const fs = require("fs");
var prefix = "g/";








naqeb.on('ready', () => {
  console.log(`Logged in as ${naqeb.user.tag}!`);
 naqeb.user.setActivity("g/help",{type: 'Playing'})
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${naqeb.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`server! [ " ${naqeb.guilds.size} " ]`);
  console.log(`Users! [ " ${naqeb.users.size} " ]`);
  console.log(`channels! [ " ${naqeb.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});


const anti = JSON.parse(fs.readFileSync("./antigreff.json", "UTF8")); // create antigreff.json file with {} inside it
const config = JSON.parse(fs.readFileSync("./config.json", "UTF8")); // create config.json file with

naqeb.on("message", message => {
  if (message.content === prefix + "settings") {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      if (!message.channel.guild) return;
    if (message.content < 1023) return;
    const Embed = new Discord.RichEmbed()
      .setAuthor(naqeb.user.username, naqeb.user.avatarURL)
      .setThumbnail(naqeb.user.avatarURL).setDescription(`AntiBan
Enabled:🟢 
Maximum Ban : ${config[message.guild.id].banLimit}
-
AntiKick
Enabled:🟢 
Maximum Kick : ${config[message.guild.id].kickLimits}
-
AntiChannelD
Enabled:🟢 
Maximum Delete : ${config[message.guild.id].chaDelLimit}
-
AntiRoleD
Enabled:🟢 
Maximum Delete : ${config[message.guild.id].roleDelLimit}
-
AntiRoleC
Enabled:🟢 
Maximum Create : ${config[message.guild.id].roleCrLimits}
-
AntiTime
Enabled:🟢 
Maximum Time : ${config[message.guild.id].time}
`);

    message.channel.sendEmbed(Embed);
  }
});


naqeb.on("message", message => {
  if (!message.channel.guild) return;
  let user = anti[message.guild.id + message.author.id];
  let num = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  if (!anti[message.guild.id + message.author.id])
    anti[message.guild.id + message.author.id] = {
      actions: 0
    };
  if (!config[message.guild.id])
    config[message.guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2,
      time: 2
    };
  if (message.content.startsWith(prefix + "settings")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    if (message.content.startsWith(prefix + "settings ban")) {
      if (!num)
        return message.channel.send(
          "--> | Type numbers after the command ! "
        );
      if (isNaN(num))
        return message.channel.send(
          "--> | Type numbers after the command !  "
        );
      config[message.guild.id].banLimit = num;
      message.channel.send(
        `-->| Changed To : ${config[message.guild.id].banLimit} `
      );
    }
    if (message.content.startsWith(prefix + "settings kick")) {
      if (!num)
        return message.channel.send(
          "--> | Type numbers after the command ! "
        );
      if (isNaN(num))
        return message.channel.send(
          "--> | Type numbers after the command ! "
        );
      config[message.guild.id].kickLimits = num;
      message.channel.send(
        `--> | Changed To: ${config[message.guild.id].kickLimits}`
      );
    }
    if (message.content.startsWith(prefix + "settings roleD")) {
      if (!num)
        return message.channel.send(
          "-->| Type numbers after the command ! "
        );
      if (isNaN(num))
        return message.channel.send(
          "--> | Type numbers after the command ! "
        );
      config[message.guild.id].roleDelLimit = num;
      message.channel.send(
        `--> | Changed To : ${config[message.guild.id].roleDelLimit}`
      );
    }
    if (message.content.startsWith(prefix + "settings roleC")) {
      if (!num)
        return message.channel.send(
          "--> | Type numbers after the command ! "
        );
      if (isNaN(num))
        return message.channel.send(
          "--> | Type numbers after the command ! "
        );
      config[message.guild.id].roleCrLimits = num;
      message.channel.send(
        `--> | Changed To : ${config[message.guild.id].roleCrLimits}`
      );
    }
    if (message.content.startsWith(prefix + "settings channelD")) {
      if (!num)
        return message.channel.send(
          "--> | Type numbers after the command ! "
        );
      if (isNaN(num))
        return message.channel.send(
          "--> | Type numbers after the command ! "
        );
      config[message.guild.id].chaDelLimit = num;
      message.channel.send(
        `--> | Changed To : ${config[message.guild.id].chaDelLimit}`
      );
    }
    if (message.content.startsWith(prefix + "settings time")) {
      if (!num)
        return message.channel.send(
          "--> | Type numbers after the command ! "
        );
      if (isNaN(num))
        return message.channel.send(
          "--> | Type numbers after the command ! "
        );
      config[message.guild.id].time = num;
      message.channel.send(
        ` | Changed To: ${config[message.guild.id].time}`
      );
    }
    fs.writeFile("./config.json", JSON.stringify(config), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
      if (e) throw e;
    });
  }
});
naqeb.on("channelDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].chaDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `--> | ${entry.username} tried to delete many channels`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

naqeb.on("roleDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `--> | ${entry.username} tried to delete many roles `
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

naqeb.on("roleCreate", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleCrLimits
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `--> | ${entry.username} tried to create many roles`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

naqeb.on("guildBanAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_BAN_ADD"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(
            `--> | ${entry.username} Tried to ban all memebers `
          )
        );
      anti[guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

naqeb.on("guildKickAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_KICK"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 2,
      chaDelLimit: 2,
      roleDelLimit: 2,
      kickLimits: 2,
      roleCrLimits: 2
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(
            `--> | ${entry.username} tried to ban all memebers `
          )
        );
      anti[guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

naqeb.on("guildMemberRemove", async member => {
  const entry1 = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry1.action === "MEMBER_KICK") {
    const entry2 = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_KICK"
      })
      .then(audit => audit.entries.first());
    const entry = entry2.executor;
    if (!config[member.id])
      config[member.id] = {
        banLimit: 2,
        chaDelLimit: 2,
        roleDelLimit: 2,
        kickLimits: 2,
        roleCrLimits: 2
      };
    if (!anti[member.guild.id + entry.id]) {
      anti[member.guild.id + entry.id] = {
        actions: 1
      };
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = "0";
      }, config[member.guild.id].time * 1000);
    } else {
      anti[member.guild.id + entry.id].actions = Math.floor(
        anti[member.guild.id + entry.id].actions + 1
      );
      console.log("TETS");
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = "0";
      }, config[member.guild.id].time * 1000);
      if (
        anti[member.guild.id + entry.id].actions >=
        config[member.guild.id].kickLimits
      ) {
        member.guild.members
          .get(entry.id)
          .ban()
          .catch(e =>
            member.owner.send(
              `--> | ${entry.username} tried to ban all memebers `
            )
          );
        anti[member.guild.id + entry.id].actions = "0";
        fs.writeFile("./config.json", JSON.stringify(config), function(e) {
          if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
          if (e) throw e;
        });
      }
    }

    fs.writeFile("./config.json", JSON.stringify(config), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
      if (e) throw e;
    });
  }
}); 
 

   


   

  

///////////////////////security///////////////////

naqeb.on("message", async message => {
  if (message.content.startsWith(prefix + "help")) {
    /// security bot
    let help = new Discord.RichEmbed()
      .setColor("#2e0000")
      .setTimestamp()
      .setFooter("Sponsored By: Secrutiy ")

      .setThumbnail(message.author.avatarURL).setDescription(`
      
                The prefix for the bot is: g/
${prefix}settings 
${prefix}settings kick <number>
${prefix}settings roleD <number>
${prefix}settings roleC <number>
${prefix}settings ban <number>**
${prefix}settings channelD <number>
${prefix}settings time <number>
${prefix}antibot on
${prefix}antibot off
${prefix}bot
${prefix}lock
${prefix}unlock
${prefix}unbansall
${prefix}movall
${prefix}invite
[support](https://discord.gg/9PravbR) - [invite](https://discord.com/api/oauth2/authorize?client_id=719159661470810133&permissions=8&scope=bot) - [website](https://secruity.glitch.me/) - [Vote to my server](https://top.gg/servers/search?q=Secrutiy)
       
    `)
    
    message.channel.sendEmbed(help);
  }
});


const db = require("quick.db"); // npm i quick.db

naqeb.on("message", async message => {
  const prefix = "g/"; //comand
 
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let antibot = await db.fetch(`antibot_${message.guild.id}`);
  if (antibot === null) antibot = "off";

  if (cmd === "antibot") {
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return message.reply(`Only OWNER can use this command`);
    if (!args[0])
      return message.reply(
        `___Do you want to enter the bot to your server?___ \`off / on\``
      );

    if (args[0] === "on") {
      db.set(`antibot_${message.guild.id}`, "on");
      message.reply(`Antibot is on`).RichEmbed();
    }

    if (args[0] === "off") {
      db.set(`antibot_${message.guild.id}`, "off");
      message.reply(`Antibot is off`).RichEmbed();
    }
  }
});
naqeb.on("guildMemberAdd", async member => {
  let antibot = await db.fetch(`antibot_${member.guild.id}`);
  if (antibot === "on") {
    if (member.user.bot) member.kick("Anti bot is on !");
  }
});


 









naqeb.on("message", zaid => {
  if (zaid.content === prefix + "bot") {
    const bot = new Discord.RichEmbed()
      .setTimestamp()
      .setFooter("Sponsored By: Secrutiy ")
      .setColor("#2e0000")
    


      .addField("**Name**", `${naqeb.user.tag} `, true)
       
      .addField("**ID**",` 719159661470810133 `, true)
    
      .addField("**Server**", `${naqeb.guilds.size}`, true)

      .addField("**Members**", `${naqeb.users.size} `, true)

      .addField("**Owner**",`<@605816441677152266> `)


    zaid.channel.send(bot);
  }
});

naqeb.on("message", async message => {
  if (message.content === prefix + "unbansall") {
    var user = message.mentions.users.first();
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("❌|**`ADMINISTRATOR`Sorry, you can't. `**");
    if (!message.guild.member(naqeb.user).hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    const guild = message.guild;

    message.guild.fetchBans().then(ba => {
      ba.forEach(ns => {
        message.guild.unban(ns);
        const embed = new Discord.RichEmbed()
          .setColor("#2e0000")
          .setDescription(`**:white_check_mark: All bands were removed**`)
          .setFooter(
            "requested by" + message.author.username,
            message.author.avatarURL
          );
        message.channel.sendEmbed(embed);
        guild.owner.send(`Server : ${guild.name}
‎  **unbands all in ** : <@${message.author.id}>`);
      });
    });
  }
});

naqeb.on("message", message => {
  if (message.content.startsWith(prefix + "movall")) {
    if (!message.member.hasPermission("MOVE_MEMBERS"))
      return message.channel.send("x You Dont Have Perms MOVE_MEMBERS");
    if (!message.guild.member(naqeb.user).hasPermission("MOVE_MEMBERS"))
      return message.reply("x I Dont Have Perms MOVE_MEMBERS");
    if (message.member.voiceChannel == null)
      return message.channel.send("please join the any voice");
    var author = message.member.voiceChannelID;
    var m = message.guild.members.filter(m => m.voiceChannel);
    message.guild.members
      .filter(m => m.voiceChannel)
      .forEach(m => {
        m.setVoiceChannel(author);
      });
    message.channel.send("white_check_mark: Success Moved All To Your Channel");
  }
});


naqeb.on('message', message => {
 
if(message.content.includes("@everyone")){
if(!message.member.hasPermission('KICK_MEMBERS')){
message.delete(); 
message.reply(", you cant send everyone message")
}
 
}
 
});
 
 
naqeb.on('message', message => {
 
if(message.content.includes("@everyone@everyone")){
if(!message.member.hasPermission('KICK_MEMBERS')){
message.delete(); 
message.reply(", you cant send everyone message")
}
 
}
 
});


naqeb.on("message", async message => {
  if (message.content.startsWith(prefix + "invite")) {
    let invite = new Discord.RichEmbed()
      .setColor("2e0000")
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setThumbnail(message.author.avatarURL)
      .setTitle("click here to invite bots")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=719159661470810133&permissions=8&scope=bot`);
    message.channel.sendEmbed(invite);
  }
});

naqeb.on("ready", () => {
  naqeb.user.setActivity("g/help | it's time secruity to your server!", { type: "Playing" });
  naqeb.user.setStatus("Playing");
});

naqeb.on("message", message => {
  if (message.content === prefix + "lock") {
    if (!message.channel.guild)
      return message.reply(" This command only for servers");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("please dot tech the command");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply(":white_check_mark::lock now locked channels ");
      });
  }
  //FIRE BOT
  if (message.content === prefix + "unlock") {
    if (!message.channel.guild)
      return message.reply(" This command only for servers");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("please dot tech the command");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply(":white_check_mark::unlock: now unlock channels ");
      });
  }
});

naqeb.login("NzE5MTU5NjYxNDcwODEwMTMz.XtzXoA.WwHiFnrV8uNfjgJeo3mHuLx7vW4");
