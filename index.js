const Discord = require("discord.js");

const { Client, Util } = require("discord.js");

const { TOKEN, PREFIX, GOOGLE_API_KEY } = require("./config");

const YouTube = require("simple-youtube-api");

const ytdl = require("ytdl-core");

const bot = new Client({ disableEveryone: true });

const moment = require("moment");

const Canvas = require("canvas");

require("./server.js");

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

const client = new Discord.Client();

const author = 'ＨＩＬＯ#8056';

////////////////////////////////////////////////////CLIENT////////////////////////////////////////////////////////////////////

const config = require('./config.json');

const fs = require("fs");

let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));

client.on("message", message => {

    if (message.author.bot) return; // ignore bots

    // if the user is not on db add the user and change his values to 0

    if (!db[message.author.id]) db[message.author.id] = {

        xp: 0,

        level: 0

      };

    db[message.author.id].xp++;

    let userInfo = db[message.author.id];

    if(userInfo.xp > 100) {

        userInfo.level++

        userInfo.xp = 0

      let embed = new Discord.RichEmbed()

      .setColor("#7289DA")

      .setTitle("Congratulation")

      .setDescription("You Level Up!! `" + userInfo.level + "`" )

        message.reply(embed).then(message => {

            message.delete(10000);

        })

    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLowerCase();

    if (message.content.startsWith("!!!level")) {

        let userInfo = db[message.author.id];

        let member = message.mentions.members.first();

        let embed = new Discord.RichEmbed()

        .setThumbnail(message.author.displayAvatarURL)

        .setColor(0x4286f4)

        .setTitle(`${message.author.username}`)

        .addField("Level :", userInfo.level)

        .addField("XP :", userInfo.xp+"/100")

        .setTimestamp()

        .setFooter(`Message From : ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL);

        if(!member) return message.channel.sendEmbed(embed)

        let memberInfo = db[member.id]

        let embed2 = new Discord.RichEmbed()

        .setThumbnail(message.author.displayAvatarURL)

        .setColor(0x4286f4)

        .setTitle(`${message.author.username}`)

        .addField("Level :", memberInfo.level)

        .addField("XP :", memberInfo.xp+"/100")

        .setTimestamp()

        .setFooter(`Message From : ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL);

        message.channel.sendEmbed(embed2)

    }

    fs.writeFile("./database.json", JSON.stringify(db), (x) => {

        if (x) console.error(x)

      });

})

client.login(process.env.BOT_TOKEN)

////////////////////////////////////////////////////////////BOT//////////////////////////////////////////////////////////////

function emoji (id) {

  return bot.emojis.get(id).toString();

}

/////////////////////////////////////////////////////////WARN////////////////////////////////////////////////////////////////

const file = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

bot.on('message', async (msg) => {

  

  if(msg.content.indexOf(config.prefix) !== 0) return;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  

if (!msg.content.startsWith("!!!")) return;

if (msg.author.bot) return;

if (msg.content.startsWith('!!!warn')) {

if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply('You Not Admin!');

      let member = msg.mentions.members.first();

if (!file[msg.mentions.members.first().id]) {

  file[msg.mentions.members.first().id] = {

    warns: 0

  }

};

file[msg.mentions.members.first().id] = {

  warns: file[msg.mentions.members.first().id].warns + 1

}

fs.writeFile("./warns.json", JSON.stringify(file), (err) => {

  if (err) console.error(err);

  console.log("Added Warn!")

});

let user = msg.mentions.users.first() || msg.author;

  let reason = args.slice(1).join(' ');

  if(!reason) reason = "No Reason";

let embed = new Discord.RichEmbed(reason)

.setColor("BLUE")

.setTitle("WARN MEMBER")

.setDescription(` 

================================

**Name**           : __${user}__

**ID**                  : __${user.id}__

**Warn**  : __${file[user.id].warns}__

**Reason**         : __${reason}__

**Admin**          : __${msg.author.username}__

================================

`)

.setFooter(`Message From : ${msg.author.username}#${msg.author.discriminator}`,

        bot.user.displayAvatarURL);

        msg.channel.send(embed);

;

  

  ///////////////////////////////////////////////////////////////////////////////////

  

  

  if(file[user.id].warns == 1) {

    msg.channel.send( user.tag + " Counted " + file[user.id].warns + " Times of Violation")

  }

  

  

  ////////////////////////////////////////////////////////////////////////////////////

  

  

  if(file[user.id].warns == 2) {

    msg.channel.send( user.tag + " Counted " + file[user.id].warns + " Times of Violation")

  }

     

  

  ////////////////////////////////////////////////////////////////////////////////////

     

     

 if(file[user.id].warns == 3) {

   user.send("You have Violated 3 Times on the Server " + msg.guild.name + "\nReson : " + reason + "\nNext Time You Don't Break!")

    msg.channel.send( user.tag + "Counted " + file[user.id].warns + " Times of Violation")

    if (user) {

      const member = msg.guild.member(user);

      if (member) {

        member

          .kick('-----')

          .then(() => {

            msg.reply({embed: {

  color: 3447003,

  description: `"${user.username}" Good Bye :)`

}});

          })

          .catch(err => {

            console.error(err);

          });

      }

    }

    if (!msg.guild) return;

  }

}

})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// DATABASE WARN ADA DI warns.json ///////////////////// BISA DI RESET ///////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bot.on("message", async message => {

  if (message.author.bot) return;

  if (!message.guild) return;

  

  if (message.content.startsWith("emoji")) {

    message.channel.send( emoji("528208256124846111") + " Ini Kah")

  }

  

  if(message.content == client.user.toString()) {

message.reply("Hi, my name is " + bot.user.tag + "\nIf You Want To Use Me With `!!!`")

  }

                      

                      

  if (message.content.startsWith("!!!ping")) {

    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.

    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)

    message.channel.send(`Ping You : ${Date.now() - message.createdTimestamp} MS`);

  }

  let blacklisted = ["!!!play","!!!skip","!!!leave","!!!s","!!!join","!!!vol","!!!volume","!!!v","!!!p"]; //for blacklist message

  let foundInText = false;

  for (var i in blacklisted) {

    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()))

      foundInText = true;

  }

  if (foundInText) {

    message.delete(20);

  }

});

function randomStatus() {

  var time4 = moment(Date.now()).format("Do - MMMM - YYYY")

  var time5 = moment(Date.now()).utcOffset("+0700").format("LT")

  let status = [

    "!!!help |" + ` ${bot.guilds.size}` + ` Server`,

    "!!!help | " + author,

    `!!!help | ${bot.users.size} users!`,

    "!!!help | IG : hilo_segerrr",

    "!!!help | 🇮🇩 Bot Indonesia 🇮🇩",

    `!!!help | Date : ${time4}`,

    `!!!help | Time : ${time5}`

  ];

  let rstatus = Math.floor(Math.random() * status.length);

  bot.user.setActivity(status[rstatus], { type: "PLAYING" });

}

setInterval(randomStatus, 10000);

// Pass the entire Canvas object because you'll need to access its width, as well its context

const applyText = (canvas, text) => {

	const ctx = canvas.getContext('2d');

	// Declare a base size of the font

	let fontSize = 80;

	do {

		// Assign the font to the context and decrement it so it can be measured again

		ctx.font = `${fontSize -= 10}px serif-bold`;

		// Compare pixel width of the text to the canvas minus the approximate avatar size

	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas

	return ctx.font;

};

bot.on("guildMemberAdd", async member => {

  const channelme = member.guild.channels.find(ch => ch.name === 'join');

  if (!channelme) return;

	const canvas = Canvas.createCanvas(700, 250);

	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQktJqv1dukU76F65KRJwGNBdMXIy-wEcW8XAvIGIkwDGXGnhCl&usqp=CAU');

	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#ffffff';

	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name

	ctx.font = '28px sans-serif';

	ctx.fillStyle = '#ffffff';

	ctx.fillText('Selamat Datang,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below

	ctx.font = applyText(canvas, `${member.displayName}!`);

	ctx.fillStyle = '#ffffff';

	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();

	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL);

	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

	channelme.send( emoji("682150373511004171") + ` Selamat Datang, ${member}!`, attachment);

});

bot.on("guildMemberRemove", async member => {

  const channelme = member.guild.channels.find(ch => ch.name === 'leave');

  if (!channelme) return;

	const canvas = Canvas.createCanvas(700, 250);

	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQktJqv1dukU76F65KRJwGNBdMXIy-wEcW8XAvIGIkwDGXGnhCl&usqp=CAU');

	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#ffffff';

	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name

	ctx.font = '28px sans-serif';

	ctx.fillStyle = '#ffffff';

	ctx.fillText('Selamat Tinggal,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below

	ctx.font = applyText(canvas, `${member.displayName}!`);

	ctx.fillStyle = '#ffffff';

	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();

	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);

	ctx.closePath();

	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL);

	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome.png');

	channelme.send( emoji("682123448188928008") + ` Selamat Tinggal, ${member}!`, attachment); 

});

bot.on('guildMemberAdd', member => {

  

  console.log('User ' + member.user.username + ' has joined the server!')

  

  let roles = member.guild.roles.find(x=> x.name === "}=Member={")

if(!roles) return // biar kalo roles nya ga ada ke return

  

  member.addRole(roles)

});

bot.on("warn", console.warn);

bot.on("error", console.error);

bot.on("disconnect", () =>

  console.log("An error occurred, trying to reconnect!")

);

bot.on("reconnecting", () => console.log("I am reconnecting now..."));

bot.on("ready", function() {

  console.log(`${bot.user.tag} READY!`);

  function kalender() {

    var tanggal = moment(Date.now()).utcOffset("+0700").format("Do - MMMM - YYYY");

    var jamWIB = moment(Date.now()).utcOffset("+0700").format("LT");

    var jamWITA = moment(Date.now()).utcOffset("+0800").format("LT");

    var jamWIT = moment(Date.now()).utcOffset("+0900").format("LT")

    var event = 'Tidak Ada'

    let myGuild1 = bot.guilds.get("685829347994763264");

    let wildan = bot.guilds.get("684799373900513311");

    let nikki = bot.guilds.get("660395366998343700");

    let voice1 = myGuild1.channels.get("695999749257429022");

    let voice3 = myGuild1.channels.get("696052180305575976");

    let voicewib = wildan.channels.get("701010462388518943");

    let voicewita = wildan.channels.get("701012482705326100");

    let voicewit = wildan.channels.get("701015057466654760");

    let date1 = wildan.channels.get("701054014149886152");

    let nikkiwib = nikki.channels.get("701087927152803840");

    let nikkiwita = nikki.channels.get("701087959130177626");

    let nikkiwit = nikki.channels.get("701087990528868352");

    let nikkidate = nikki.channels.get("701088040465989703");

    voice1.setName(`Time: ` + jamWIB);

    voice3.setName(`Event: ` + event);

    voicewib.setName(`╭⏰★。ͅ-ֵ┃WIB ` + jamWIB);

    voicewita.setName(`│⏰★。ͅ-ֵ┃WITA ` + jamWITA);

    voicewit.setName(`│⏰★。ͅ-ֵ┃WIT ` + jamWIT);

    date1.setName(`╰📆★。ͅ-ֵ┃ ` + tanggal)

    nikkiwib.setName(`╭⏰★。ͅ-ֵ┃WIB ` + jamWIB);

    nikkiwita.setName(`│⏰★。ͅ-ֵ┃WITA ` + jamWITA);

    nikkiwit.setName(`│⏰★。ͅ-ֵ┃WIT ` + jamWIT);

    nikkidate.setName(`╰📆★。ͅ-ֵ┃ ` + tanggal);

  }

  setInterval(kalender, 10000);

});

bot.on("message", function(message) {

  if (!message.guild) return;

  if (message.author.bot) return;

  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");

  var command = args[0].toLowerCase();

  //command

  if (command === "bot" || command === "infobot") {

    if (message.author.id !== "331684540223586304")

      return message.channel.send(

        "<@" + message.author.id + ">" + " You Not Owner"

      );

    let uptime = bot.uptime;

    let seconds = uptime / 1000;

    const days = parseInt(seconds / 86400);

    seconds %= 86400;

    const hours = parseInt(seconds / 3600);

    seconds %= 3600;

    const minutes = parseInt(seconds / 60);

    seconds = parseInt(seconds % 60);

    uptime = `${days}d, ${hours}h, ${minutes}m ${seconds}s`;

    let cpu = Math.round(process.cpuUsage().system);

    let cpupercent = Math.round(cpu / 100 / 1000) / 10;

    let ram =

      Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 10) / 10;

    let rampercent = Math.round((ram / 512) * 1000) / 10;

    let embed = new Discord.RichEmbed()

      .setThumbnail(bot.user.displayAvatarURL)

      .setColor("#7289DA")

      .setAuthor(bot.user.tag, bot.user.displayAvatarURL)

      .setDescription(

        "```Uptime  : " +

          uptime +

          "\nMemory  : " +

          Math.round(process.memoryUsage().heapUsed / 1024 / 1024) +

          "Mb\nCPU     : " +

          cpupercent +

          "\nLibrary : discord.js\nServer  : " +

          bot.guilds.size +

          "\nUsers   : " +

          bot.users.size +

          "```"

      )

      .setTimestamp()

      .setFooter(

        `Pesan Dari : ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL);

    message.channel.send(embed);

  }

  if (command === "restart" || command === "r") {

    if (message.author.id !== "331684540223586304")

      return message.channel.send("You Not Owner");

    let embed = new Discord.RichEmbed()

      .setColor("#7289DA")

      .setDescription("Reboot!");

    message.channel.send(embed).then(() => {

      message.delete(10000)

      process.exit(1);

    });

  }

});

bot.on("message", async msg => {

  // eslint-disable-line

  if (msg.author.bot) return undefined;

  if (!msg.content.startsWith(PREFIX)) return undefined;

  const args = msg.content.split(" ");

  const searchString = args.slice(1).join(" ");

  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";

  const serverQueue = queue.get(msg.guild.id);

  let command = msg.content.toLowerCase().split(" ")[0];

  command = command.slice(PREFIX.length);

  

  

  if (command === "tutorialbot") {

    const embed = new Discord.RichEmbed()

    .setTitle("Klick Link")

    .setDescription("[Video Tutorial Music Bot By Zealcord Nation](https://www.youtube.com/watch?v=ZL7rC0xiV9c)")

    .setColor("#7289DA")

    .setTimestamp()

    .setFooter(`Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL);

    msg.channel.send(embed);

  }

  

  if (command === "purge" || command === "del" || command === "delete") {

    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.

    const deleteCount = parseInt(args[1], 10);

    // Ooooh nice, combined conditions. <3

    if (!deleteCount || deleteCount < 2 || deleteCount > 100)

      return msg.reply({

        embed: {

          color: 3447003,

          description: "Pesan Yang Harus Dihapus Min 2 Max 100...",

          timestamp: new Date(),

              footer: {

                icon_url: client.user.avatarURL,

                text: `Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`

              }

        }

      });

    // So we get our messages, and delete them. Simple enough, right?

    const fetched = await msg.channel.fetchMessages({ limit: deleteCount });

    msg.channel

      .bulkDelete(deleteCount)

      .catch(error =>

        msg.reply(`Ga Bisa Ngehapus Pesan Karena : ${error}`)

      );

  }

  if (command === "server") {

    let uptime = bot.uptime;

    let seconds = uptime / 1000;

    const days = parseInt(seconds / 86400);

    seconds %= 86400;

    const hours = parseInt(seconds / 3600);

    seconds %= 3600;

    const minutes = parseInt(seconds / 60);

    seconds = parseInt(seconds % 60);

    uptime = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;

    

    const exampleEmbed = new Discord.RichEmbed()

      .setColor("#7289DA")

      .setThumbnail(msg.guild.iconURL)

      .addField(

        `===============\n__**AUTHOR : ${author}**__\n__**CREATE : 2/4/2020**__\n__**UPTIME : ${uptime}**__\n__**PREFIX : !!!**__`,

        "\n==============="

      )

      .addBlankField()

      .setAuthor(msg.guild.name)

      .addField("PING", `${Date.now() - msg.createdTimestamp} MS`)

      .addField("MEMBER COUNT", `${msg.guild.memberCount} MEMBER`, true)

      .addField("GUILD COUNT", `${bot.guilds.size} SERVER`, true)

      .addField(

        "VOICE COUNT",

        msg.guild.channels.filter(x => x.type === "voice").size + " VOICE",

        true

      )

      .addField(

        "CATEGORY COUNT",

        msg.guild.channels.filter(x => x.type === "category").size +

          " CATEGORY",

        true

      )

      .addField(

        "CHAT COUNT",

        msg.guild.channels.filter(x => x.type === "text").size + " CHAT",

        true

      )

      .addField(

        "NEWS",

        msg.guild.channels.filter(x => x.type === "news").size + " NEWS",

        true

      )

      .addField("REGIONAL", msg.guild.region, true)

      .setTimestamp()

      .setFooter(

        `Message From : ${msg.author.username}#${msg.author.discriminator}`,

        msg.author.displayAvatarURL

      );

    msg.channel.send(exampleEmbed);

  }

  if (command === "profile" || command === "prof" || command === "user-info") {

    var tempat = moment.locale();

    let member = msg.mentions.members.first() || msg.member,

      user = member.user;

    let embed = new Discord.RichEmbed()

      .setAuthor("Profile")

      .setColor("#7289DA")

      .setThumbnail(msg.author.displayAvatarURL)

      .addField(

        "Username",

        `${msg.author.username}#${msg.author.discriminator}`

      )

      .addField("ID", msg.author.id)

    .addField('Status :', user.presence.status, true)

      .addField(

        "Joined The Server :",

        `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`,

        true

      )

      .addField(

        "Account Created :",

        `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`,

        true

      )

      .addField("Roles:", member.roles.map(r => `${r}`).join(" │ "), true)

      .setTimestamp()

      .setFooter(

        `Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`,

        msg.author.displayAvatarURL

      );

    msg.channel.send(embed);

  }

  if (command === "say") {

    let saymsg = msg.content;

    msg.channel.send(saymsg.replace("!!!say", ""));

    msg.delete(1);

  }

  if (command === "ban") {

    if (!msg.member.hasPermission("ADMINISTRATOR"))

      return msg.reply("You Not Admin");

    // Easy way to get member object though mentions.

    var member = msg.mentions.members.first();

    // ban

    member

      .ban()

      .then(member => {

        // Successmessage

        msg.channel.send(

          ":wave: " +

            member.displayName +

            " Member Sudah Di Ban Terimakasih Sudah Menggunakan Jasa Banned Saya:) ".then(

              msg => {

                msg.delete(10000);

              }

            )

        );

      })

      .catch(() => {

        // Failmessage

        msg.channel.send("Done Banned").then(msg => {

          msg.delete(10000);

        });

        msg.delete(1);

      });

  }

  if (command === "kick") {

    if (!msg.member.hasPermission("ADMINISTRATOR"))

      return msg.reply("You Not Admin");

    // Easy way to get member object though mentions.

    var member = msg.mentions.members.first();

    // Kick

    member

      .kick()

      .then(member => {

        // Successmessage

        msg.channel.send(

          ":wave: " +

            member.displayName +

            " Sudah di kick".then(msg => {

              msg.delete(10000);

            })

        );

      })

      .catch(() => {

        // Failmessage

        msg.channel.send("Done Kick").then(msg => {

          msg.delete(10000);

        });

        msg.delete(1);

      });

  }

  if (command === "avatar" || command === "ava") {

    let users = msg.mentions.users.first() || msg.author;

    let embed = new Discord.RichEmbed()

      .setAuthor(users.username)

      .setColor("#7289DA")

      .setTimestamp()

      .setImage(users.avatarURL)

      .setFooter(

        `Message From : ${msg.author.username}#${msg.author.discriminator}`,

        bot.user.displayAvatarURL

      );

    msg.channel.send(embed);

  }

  if (command === "help" || command == "cmd" || command === "h") {

    let uptime = bot.uptime;

    let seconds = uptime / 1000;

    const days = parseInt(seconds / 86400);

    seconds %= 86400;

    const hours = parseInt(seconds / 3600);

    seconds %= 3600;

    const minutes = parseInt(seconds / 60);

    seconds = parseInt(seconds % 60);

    uptime = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;

    const helpembed = new Discord.RichEmbed()

    .setThumbnail(bot.user.displayAvatarURL)

      .setColor("#7289DA")

      .setAuthor(bot.user.tag, bot.user.displayAvatarURL)

      .setDescription(

        "| [Support Me](https://discord.gg/Sqj6UQp) | [Invite Me](https://discordapp.com/oauth2/authorize?client_id=694951596286804050&scope=bot&permissions=8) | [Vote](https://top.gg/) | [YouTube](https://www.youtube.com/channel/UCODLE_vcAUAquA4u0UKegBQ) |\n__**AUTHOR : " + author + "**__\n__**UPTIME : " + uptime + "**__\n__**CREATE : 2/4/2020**__\n__**PREFIX : !!!**__\n\n__**MUSIK**__ \n```!!!play\n!!!skip\n!!!stop\n!!!pause\n!!!volume [1/100]\n!!!nowplaying\n!!!queue\n!!!join\n!!!leave```\n__**ADMIN**__\n```!!!ban\n!!!kick\n!!!warn```\n__**FUN**__\n```!!!say\n!!!avatar\n!!!profile\n!!!server```\n__**LEVELS**__\n```!!!level```\n__**How To Create Bot**__\n```!!!tutorialbot```\n__**CONTACT**__\n```Discord : " + author + "\nIG : hilo_segerrr\nIF THERE IS AN ERROR CONTACT THE OWNER / WRITER!```")

      .setTimestamp()

      .setFooter(

        `Message From : ${msg.author.username}#${msg.author.discriminator}`,

        msg.author.displayAvatarURL

      );

    msg.channel.send(helpembed);

  }

  if (command === "join") {

    const voiceChannel = msg.member.voiceChannel;

    if (!voiceChannel)

      return msg.channel.send("You Join Your Voice")

    let embed = new Discord.RichEmbed()

    .setColor("7289DA")

    .setDescription("```🙋 Done Join Your Voice ```")

    .setTimestamp()

    .setFooter(`Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);

    msg.channel.send(embed);

    msg.member.voiceChannel.join();

  }

  if (command === "leave" || command === "dc" || command === "disconnect") {

    const voiceChannel = msg.member.voiceChannel;

    if (!voiceChannel)

      return msg.channel.send("You Not Join Voice")

    let embed = new Discord.RichEmbed()

    .setColor("7289DA")

    .setDescription("```🙋 Done Leave Your Voice ```")

    .setTimestamp()

    .setFooter(`Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);

    msg.channel.sendEmbed(embed);

    msg.member.voiceChannel.leave();

  }

  if (command === "play" || command === "p") {

    const voiceChannel = msg.member.voiceChannel;

    if (!voiceChannel)

      return msg.channel.send(

        "You Not Join Voice"

      );

    const permissions = voiceChannel.permissionsFor(msg.client.user);

    if (!permissions.has("CONNECT")) {

      return msg.channel.send(

        "Sorry, but i need **`CONNECT`** permissions to proceed!"

      );

    }

    if (!permissions.has("SPEAK")) {

      return msg.channel.send(

        "Sorry, but i need **`SPEAK`** permissions to proceed!"

      );

    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

      const playlist = await youtube.getPlaylist(url);

      const videos = await playlist.getVideos();

      for (const video of Object.values(videos)) {

        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop

        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop

      }

      return msg.channel.send(

        `** :thumbsup: **|**  Playlist: **\`${playlist.title}\`** Di Tambahkan Kedalam List! **|**`

      );

    } else {

      try {

        var video = await youtube.getVideo(url);

      } catch (error) {

        try {

          var videos = await youtube.searchVideos(searchString, 10);

          let index = 0;

          const embed1 = new Discord.RichEmbed()

            .setTitle( emoji("684411351602298884") + " Select Music " + emoji("684411351602298884"))

            .setDescription(`${videos.map(video2 => `${++index}. ${video2.title}`).join("\n")}\n` + emoji("682129655976689671") + ` **Select 1 - 10 Never Use a Prefix!** ` + emoji("682129655976689671") )

            .setColor("#7289DA");

          msg.channel.sendEmbed(embed1).then(message => {

            message.delete(20000);

          });

          // eslint-disable-next-line max-depth

          try {

            var response = await msg.channel.awaitMessages(

              msg2 => msg2.content > 0 && msg2.content < 11,

              {

                maxMatches: 1,

                time: 20000,

                errors: ["time"]

              }

            );

          } catch (err) {

            console.error(err);

            return msg.channel.send(

              "<@" +

                msg.author.id +

                ">" +

                " ```No Selected Song Selection Canceled ...```"

            );

          }

          const videoIndex = parseInt(response.first().content);

          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);

        } catch (err) {

          console.error(err);

          return msg.channel.send("```⚠️ 【 Error Chat Owner 】```");

        }

      }

      return handleVideo(video, msg, voiceChannel);

    }

  } else if (command === "skip" || command === "s" || command === "next") {

    if (!msg.member.voiceChannel)

      return msg.channel.send(

        "```You Not Join Voice```"

      );

    if (!serverQueue)

      return msg.channel.send(

        "```There are no songs that I can skip.```"

      );

    serverQueue.connection.dispatcher.end("Perintah skip telah digunakan!");

    let embed = new Discord.RichEmbed()

    .setColor("7289DA")

    .setDescription("```⏭️ Next Songs```")

    .setTimestamp()

    msg.channel.sendEmbed(embed);

    return undefined;

  } else if (command === "stop") {

    if (!msg.member.voiceChannel)

      return msg.channel.send(

        "```You Not Join Voice```"

      );

    if (!serverQueue)

      return msg.channel.send(

        "```There is no song I can stop.```"

      );

    serverQueue.songs = [];

    serverQueue.connection.dispatcher.end("Perintah berhenti telah digunakan!");

    let embed = new Discord.RichEmbed()

    .setColor("7289DA")

    .setDescription("```⏹️ Music Stop ```")

    .setTimestamp()

    .setFooter(`Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);

    msg.channel.sendEmbed(embed);

    return undefined;

  } 

  else if (command === "volume" || command === "vol" || command === "v") {

    if (!msg.member.hasPermission("ADMINISTRATOR"))

      return msg.reply("Only admins can use this feature!");

    if (!msg.member.voiceChannel)

      return msg.channel.send(

        "You Not Join Voice"

      );

    if (!serverQueue) return msg.channel.send("There Is No Song Which Can Use Volume");

    if (!args[1]) return msg.channel.send("```Volume : " + serverQueue.volume + "%```")

    serverQueue.volume = args[1];

    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 200);

    let embed = new Discord.RichEmbed()

      .setColor("7289DA")

      .setDescription("```Volume Set : " + args[1] + "```")

      .setTimestamp()

    .setFooter(`Message From : ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL);

    return msg.channel.sendEmbed(embed);

    

  } else if (command === "nowplaying" || command === "np") {

    if (!serverQueue) return msg.channel.send("There is no song where you can see the song playing");

    const embedNP = new Discord.RichEmbed()

      .setColor("#7289DA")

      .setDescription(

        `__**Now Playing**__\n( [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) )`

);

    return msg.channel.send(embedNP);

  } else if (

    command === "queue" ||

    command === "q" ||

    command === "list" ||

    command === "daftarputar"

  ) {

    if (!serverQueue) return msg.channel.send("No Song Can See Music Lists");

    let index = 0;

    //  //  //

    const embedqu = new Discord.RichEmbed()

      .setTitle("List Song")

      .setDescription(

        "```" +

          serverQueue.songs

            .map(song => `${++index}. ${song.title}`)

            .join("\n") +

          "```\n**Now Playing**\n( " +

          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})` +

          " )"

      )

    .setTimestamp()

      .setColor("#7289DA")

    .setFooter(`Message From : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);

    return msg.channel.sendEmbed(embedqu);

  }

  else if (command === "loop") {

    const loop = new Discord.RichEmbed()

  .setDescription("🔁 **Enable**")

  .setColor("#7289DA")

  const unloop = new Discord.RichEmbed()

  .setDescription("🔁 **Disable**")

  .setColor("#7289DA")

  serverQueue.loop = !serverQueue.loop;

  if(serverQueue.loop) return msg.channel.send(loop)

  return msg.channel.send(unloop)

  }

   else if (command === "pause" || command === "jeda") {

    if (serverQueue && serverQueue.playing) {

      serverQueue.playing = false;

      serverQueue.connection.dispatcher.pause();

      let embed = new Discord.RichEmbed()

    .setColor("7289DA")

    .setDescription("```⏯️ Music Pause ```")

    .setTimestamp()

    .setFooter(`Message From : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);

   return msg.channel.sendEmbed(embed);

    }

    return msg.channel.send("There is no song");

  } 

  else if (command === "resume") {

    if (serverQueue && !serverQueue.playing) {

      serverQueue.playing = true;

      serverQueue.connection.dispatcher.resume();

      let embed = new Discord.RichEmbed()

    .setColor("7289DA")

    .setDescription("```⏯️ Music is playing again```")

    .setTimestamp()

    .setFooter(`Pesan Dari : ${msg.author.username}#${msg.author.discriminator}`, bot.user.displayAvatarURL);

    return msg.channel.sendEmbed(embed);

    }

    return msg.channel.send("There is no song");

  }

  return undefined;

});

async function handleVideo(video, msg, voiceChannel, playlist = false) {

  const serverQueue = queue.get(msg.guild.id);

  const song = {

    id: video.id,

    title: Util.escapeMarkdown(video.title),

    url: `https://www.youtube.com/watch?v=${video.id}`

  };

  if (!serverQueue) {

    const queueConstruct = {

      textChannel: msg.channel,

      voiceChannel: voiceChannel,

      connection: null,

      songs: [],

      volume: 40,

      playing: true

    };

    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {

      var connection = await voiceChannel.join();

      queueConstruct.connection = connection;

      play(msg.guild, queueConstruct.songs[0]);

    } catch (error) {

      console.error(`I could not join the voice channel: ${error}`);

      queue.delete(msg.guild.id);

      return msg.channel.send(

        `I could not join the voice channel: **\`${error}\`**`

      );

    }

  } else {

    serverQueue.songs.push(song);

    console.log(serverQueue.songs);

    if (playlist) return undefined;

    let embed = new Discord.RichEmbed()

      .setColor("#7289DA")

      .setDescription(

        "( [" +

          song.title +

          "](https://www.youtube.com/watch?v=" +

          video.id +

          ") )\nSuccessfully added to the list"

      );

    msg.channel.send(embed);

  }

  return undefined;

}

function play(guild, song) {

  const serverQueue = queue.get(guild.id);

  if (!song) {

    setTimeout(function(){

      serverQueue.voiceChannel.leave();

    }, 110000);

    queue.delete(guild.id);

    return;

  }

    

    const dispatcher = serverQueue.connection

    .playStream(ytdl(song.url))

    .on("end", reason => {

      if (reason === "Stream is not generating quickly enough.")

        console.log("Song Ended.");

      else console.log(reason);

      serverQueue.songs.shift();

      play(guild, serverQueue.songs[0]);

    })

    .on("error", error => console.error(error));

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

  let embed = new Discord.RichEmbed()

    .setColor("#7289DA")

    .setTitle("Start playing")

    .setDescription("( " + `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) )`);

  serverQueue.textChannel.send(embed);

}

bot.login(TOKEN);
