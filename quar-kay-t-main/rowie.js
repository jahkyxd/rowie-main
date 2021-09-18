const Discord = require('discord.js');//Rowie
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');//Rowie
const chalk = require('chalk');//Rowie
const moment = require('moment');//Rowie
var Jimp = require('jimp');//Rowie
const { Client, Util } = require('discord.js');//Rowie
const fs = require('fs');//Rowie
const db = require('quick.db');//Rowie
const express = require('express');//
require('./util/eventLoader.js')(client);//Rowie
const path = require('path');//
const snekfetch = require('snekfetch');//Rowie
//Rowie

var prefix = ayarlar.prefix;//Rowie
//
const log = message => {//
    console.log(`${message}`);//Rowie
};

client.commands = new Discord.Collection();//Rowie
client.aliases = new Discord.Collection();//Rowie
fs.readdir('./komutlar/', (err, files) => {//Rowie
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//Rowie
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//Rowie
        log(`Yüklenen komut: ${props.help.name}.`);//Rowie
        client.commands.set(props.help.name, props);//Rowie
        props.conf.aliases.forEach(alias => {//Rowie
            client.aliases.set(alias, props.help.name);//Rowie
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     
let kayıtsız = ayarlar.kayıtsızROL

client.on("guildMemberAdd", member => {
  member.roles.add(kayıtsız);
});
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     Rowie

client.on("guildMemberAdd", async member => {
    moment.locale("tr");
    let kanal = client.channels.cache.get("888309984381792293");
    await kanal
      .send(
    `🎉 Sunucumuza Hoş Geldin! ${member} 
        
   Hesabın  ${moment(member.user.createdAt).format("DD MMMM YYYY dddd hh mm")} Saniye Önce Oluşmuştur                                                                                                                                                                                                           
   
   Sunucu kurallarımız <#888309984666992658>  kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek. 
  
  Sunucumuz ${member.guild.memberCount} Üyesisin  ! Tagımızı  (★)  alarak bizlere destek olabilirsin ! Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor <@&888309984327270415> rolündeki yetkililerimiz seninle ilgilenecektir ! İyi eğlenceler.
  
  `
      )
      .catch(e => console.log(e));
  });
  
  
  
  //---------------------- OTO ROL----------------------\\ 
  
  client.on("guildMemberAdd", member => {
    let botrolü = 888314677229129790
    let kayıtsızrolü = "888309984222388235";
    if (member.user.bot) {
      member.roles.add(botrolü);
    } else {
      member.roles.add(kayıtsızrolü);
    }
  });
  
  
//-----------------------HOŞ-GELDİN-MESAJI SON----------------------\\     


//-----------------------TAG-ROL-LOG----------------------\\  
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = '★'
  const sunucu = '888309984159469598'
  const log = '888309986617335808'
  const rol = '888309984222388235'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("2d3136").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ``**${newUser.username},**`` Sunucumuzda ``**${tag}**`` Tagımızı Aldığın İçin **${client.guilds.cache.get(sunucu).roles.cache.get(rol).name}** Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(log).send(new Discord.MessageEmbed().setColor("2d3136").setDescription(```${newUser} ${tag}`` Tagımızı Çıkardığı İçin ``<@&${rol}>`` Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ``${tag}`` Tagımızı Çıkardığın İçin ``${client.guilds.cache.get(sunucu).roles.cache.get(rol).name}`` Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});
//-----------------------TAG-ROL-LOG-SON----------------------\\  
client.on("guildMemberAdd", member =>{
    const hg = new Discord.MessageEmbed()
   .setColor("2d3136")
    //.setTitle(member.guild.name + '')
    .setDescription(` Sunucumuza Hoşgeldin.\n\nKayıt Olmak İçin Sunucumuzun Ses Kayıt Odalarına Girerek Ses Teyit Vererek Kayıt \n Olabilirsiniz \n\n   Yada @Vienna Bot Komut Rolündekilerle İletişime Geçebilirsiniz.`)
    .setFooter('Xeno (Discord By Developer)')
    .setTimestamp()
    member.send(hg)
})
