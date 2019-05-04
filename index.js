const Discord = require("discord.js");
const client = new Discord.Client();
// const config = require("./config.json");

client
  .login(process.env.discord_token)
  // .then(console.log(`Logged in as ${client.user.tag}!`))
  .then(console.log("Log succesfull"))
  .catch(console.error);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  let bot = client.user;

  let guild = client.guilds;
  // console.log(guild);
  //   let channels = guild.channels;
  //   console.log(channels.array());
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
  if (msg.content === "init") {
    console.log(msg.guild.channels);
    msg.guild.channels.forEach(channel => {
      console.log(channel.name);
      if (channel.name === "logs") {
      }
    });
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  let now = new Date();
  now = formatDate(now);

  // console.log("**********");
  // console.log("*        *");
  // console.log("*  LOGS  *");
  // console.log("*        *");
  // console.log("**********");

  // console.log('old user')
  // console.log(oldMember.guild.channels);
  // console.log('new member');
  // console.log(newMember);
  // TODO: wait until yhe channel is created to start sending message
  isLogCreated(oldMember);
  const channel = oldMember.guild.channels.find(ch => ch.name === "logs");
  // console.log(channel);
  // console.log(newUserChannel.name);

  // TODO: Convertirlo en un switch case con todas las posibles condiciones, user conect, user disconect, user switch chanel

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    // User Joins a voice channel

    channel.send(
      `[${now}] - ${newMember.user.username.toUpperCase()} joined VoiceChanel ${newUserChannel.name.toUpperCase()}`
    );
  } else if (newUserChannel === undefined && oldUserChannel !== undefined) {
    // User leaves a voice channel

    channel.send(
      `[${now}] - ${oldMember.user.username.toUpperCase()} left VoiceChanel ${oldUserChannel.name.toUpperCase()}`
    );
  } else if (oldUserChannel !== undefined && newUserChannel !== undefined) {
    // User switch voice channel

    channel.send(
      `[${now}] - ${oldMember.user.username.toUpperCase()} switched VoiceChanel from ${oldUserChannel.name.toUpperCase()} to ${newUserChannel.name.toUpperCase()}`
    );
  }

  // let cosas = `[${now.getHours()}:${now.getMinutes()} - ${now.getDay()}/${now.getMonth()}/${now.getFullYear()}]`;
});

function isLogCreated(member) {
  let logs = false;
  let everyone_role_id = "";
  let hera_role_id = "";

  member.guild.channels.forEach(channel => {
    if (channel.type === "text") {
      if (channel.name === "logs") {
        logs = true;
      }
    }
  });

  // console.log(member.guild.roles);
  member.guild.roles.forEach(role => {
    if (role.name === "@everyone") {
      // console.log(role.id)
      everyone_role_id = role.id;
    }

    if (role.name === "bothera") {
      hera_role_id = role.id;
    }
  });

  if (!hera_role_id) {
    member.guild
      .createRole({ name: "bothera", color: 'AQUA' })
      .then(role => {
        console.log(`Created new role with name: ${role.name}`);
        hera_role_id = role.id;
      })
      .catch(console.error);
  }

  if (!logs) {
    // TODO: Create the channel in solo read mode
    member.guild
      .createChannel("logs", "text")
      .then(console.log)
      .catch(console.error);
  }
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  let month = date.getMonth();
  let year = date.getFullYear();

  console.log('day', day);
  console.log('month', month);

  hour = twoDigits(hour);
  minutes = twoDigits(minutes);
  day = twoDigits(day);
  month = twoDigits(month);

  function twoDigits(data) {
    data = data.toString();
    if (data.length < 2) {
      data = `0${data}`;
    }
    return data;
  }

  return `${hour}:${minutes} - ${day}/${month}/${year}`;
}
