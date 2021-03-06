const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

/*
*
*https://glitch.com/edit/#!/jesanhe-discordbot?path=index.js:69:6
*
*/



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  let guild = client.guilds;
  // console.log(guild);
//   let channels = guild.channels;
//   console.log(channels.array());
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
  if (msg.content === 'init') {
    console.log(msg.guild.channels);
    msg.guild.channels.forEach(channel => {
      console.log(channel.name);
      if (channel.name === 'logs'){
        
      }
    })
  }
});

client.login(config.token);

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    let now = new Date();
    now = formatDate(now);

    console.log('**********')
    console.log('*        *')
    console.log('*  LOGS  *')
    console.log('*        *')
    console.log('**********')

    // console.log('old user')
    // console.log(oldMember.guild.channels);
    // console.log('new member');
    // console.log(newMember);
    // TODO: wait until yhe channel is created to start sending message
    isLogCreated(oldMember);
    const channel = oldMember.guild.channels.find(ch => ch.name === 'logs');
    // console.log(channel);
    // console.log(newUserChannel.name);

    // TODO: Convertirlo en un switch case con todas las posibles condiciones, user conect, user disconect, user switch chanel
  
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
       // User Joins a voice channel
      
       channel.send(`[${now}] - ${newMember.user.username.toUpperCase()} joined VoiceChanel ${newUserChannel.name.toUpperCase()}`);
  
    } else if(newUserChannel === undefined && oldUserChannel !== undefined) {
      // User leaves a voice channel

      channel.send(`[${now}] - ${oldMember.user.username.toUpperCase()} left VoiceChanel ${oldUserChannel.name.toUpperCase()}`);
  
    } else if(oldUserChannel !== undefined && newUserChannel !== undefined) {
      // User switch voice channel

      channel.send(`[${now}] - ${oldMember.user.username.toUpperCase()} switched VoiceChanel from ${oldUserChannel.name.toUpperCase()} to ${newUserChannel.name.toUpperCase()}`);

    }

    // let cosas = `[${now.getHours()}:${now.getMinutes()} - ${now.getDay()}/${now.getMonth()}/${now.getFullYear()}]`;
  });

  function isLogCreated(member) {
    let logs = false;
    member.guild.channels.forEach(channel => {

      if(channel.type === 'text') {
        if(channel.name === 'logs') {
          logs = true;
        }
      }
    });

    if(!logs) {
      // TODO: Create the channel in solo read mode
      member.guild.createChannel('logs', 'text').then(console.log).catch(console.error);
    }
  };

  function formatDate(date) {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

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