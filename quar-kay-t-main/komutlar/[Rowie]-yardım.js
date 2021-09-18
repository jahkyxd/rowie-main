const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix

exports.run = async (client, message, args) => { //Rowie Developer
  
  const embed = new Discord.MessageEmbed()//Rowie Developer
  .setColor("2d3136")
  .setAuthor(client.user.username, client.user.avatarURL())//Rowie Developer
  .setThumbnail(client.user.avatarURL())//Rowie Developer
  //.setFooter("Sphinx Yardım Menüsü", client.user.avatarURL())
  .setTitle('Vienna Yardım Menüsü')
  //.setImage('https://share.creavite.co/rDlVEbfzJvmRlneT.gif')
  .setDescription(`**Vienna  Yardım Menüsüne Hoşgeldin!\n\`Botun Kommutlarını Kullanmak İçin Botun Rolünü Yukarı Taşıyınız.\`\n**━━━━━━━━━━━━━━━━━━━**\n• |\`${prefix}erkek\` : !e @etiket isim yaş.**\n**━━━━━━━━━━━━━━━━━━━\n• |\`${prefix}kadın\` : !k @etiket isim yaş.**\n**━━━━━━━━━━━━━━━━━━━\n• |\`${prefix}isimler\`**:** !isimler @etiket.**\n**━━━━━━━━━━━━━━━━━━━\n• |\`${prefix}kayıtsız\`**:**!kayıtsız @etiket.**\n**━━━━━━━━━━━━━━━━━━━\n• |\`${prefix}kayıtçı-ver\` : !kayıtçı-ver @etiket.**\n**━━━━━━━━━━━━━━━━━━━\n• |\`${prefix}kayıtçı-al\` : !kayıtçı-al @etiket.**\n**━━━━━━━━━━━━━━━━━━━\n• |\`${prefix}vip\` : !vip @etiket.**\n**━━━━━━━━━━━━━━━━━━━\n• |\`${prefix}!vip-al\` : !vip-al @etiket.**\n`)
  
 message.channel.send(embed)
}
//Rowie Developer
exports.conf = {//Rowie Developer
  enabled: true,//Rowie Developer
  guildOnly: false,
  permLevel: 0,
  aliases: ['help', 'h', 'y', 'kayıt-yardım']
}

exports.help = {
  name: 'yardım',
  description: 'rowie',
  usage: 'yardım'
}

