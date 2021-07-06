const Discord = require("discord.js");
const ayar = require('../xd.js');

module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && ayar.roles.kayıtçı.some(s => !message.member.roles.cache.has(s))) return message.channel.send(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)
    let member = message.mentions.users.first() || client.users.cache.get(args[0]);

    if (!member) return message.channel.send(`${message.member}, Geçerli bir üye ve isim belirtmelisin.`)
    if (member.id === message.author.id) return message.channel.send(`${message.member}, Kendini kayıtsıza atamazsın!`)
    if (member.user.bot) return message.channel.send(`${message.member}, Kayıtsıza attığın üye bir bot olamaz!`)
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`${message.member}, Belirttiğin üye senden üst/aynı pozisyonda!`)
    if (member.roles.cache.has(ayar.roles.boosterRole)) return message.channel.send(`${message.member}, Kayıtsıza atmaya çalıştığın üye bir booster olamaz!`)
    await member.roles.set(ayar.roles.kayıtsız).catch(err => {});
    await member.setNickname(ayar.guild.isim).catch(err => {});
    message.channel.send(`${member}, Adlı üye kayıtsıza atıldı!`)
    message.react("827854495689998356").catch(e => {})
};
exports.config = {
    name: "kayıtsız",
    guildOnly: true,
    aliases: ["unregister"],
    cooldown: 3000
};