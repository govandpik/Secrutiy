const Discord = require("discord.js");
const naqeb = new Discord.Client();
const invites = {};
const wait = require("util").promisify(setTimeout);
const moment = require("moment");
const fs = require("fs");
var prefix = "t!";








naqeb.on('ready', () => {
  console.log(`Logged in as ${naqeb.user.tag}!`);
 naqeb.user.setActivity("t!help",{type: 'Playing'})
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
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
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
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
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
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
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
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
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
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
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
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
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
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
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
      .setColor("#FF0000")
      .setTimestamp()
      .setFooter("Sponsored By: N1 SQUAD")
