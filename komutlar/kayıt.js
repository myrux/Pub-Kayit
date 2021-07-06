const { MessageEmbed } = require('discord.js');
const ayar = require("../xd.json");

module.exports.execute = async (client, message, args) => {

    
    let BoosterRol = "827270377654583346" //Booster Rol ID
    let KayıtYetkilisi = "824579839352635406" //Yetkili Rol ID
    let ErkekRol = "824579839280414733" //Erkek Rol ID
    let KızRol = "" //Kız Rol ID

    if (!message.member.roles.cache.has(KayıtYetkilisi) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Komutu kullanabilmek için **Kayıt Yetkilisi** olman lazım.")
   
    let member = message.mentions.users.first() || client.users.cache.get(args[0]);
    let isim = args[1]
    let yaş = Number(args[2]);

    if (!member || !isim || !yaş) return message.channel.send(embed.setDescription(`Lütfen tüm argümanları düzgün yerleştiriniz ve tekrar deneyiniz.\nÖrnek: \`${ayar.prefix || '.'}e @Ewre/ID İsim Yaş\``)).then(x => x.delete({timeout: 10000}));

        const msg = await message.channel.send("Kullanıcının cinsiyetini emojiye basarak belirtiniz!")
        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

        await msg.react('<a:sinner_erkek:848889361969840149>') //erkek emojisi
        await msg.react('<a:sinner_kiz:848889431716528158>') //kız emojisi

        collector.on("collect", async(reaction, user) => {
            await msg.reactions.removeAll()
            if (reaction.emoji.id == '848889361969840149') { //erkek
                member.setNickname(`${isim} | ${yaş}`).catch();
                
                let erkekRol = message.guild.roles.cache.get(ErkekRol);
                if (erkekRol) {
                    member.roles.cache.has(BoosterRol) ? member.roles.set([BoosterRol, ErkekRol]) : member.roles.set([ErkekRol]);
                }
                member.add(ayar.roles.xy);
                member.add(ayar.roles.sj);
                member.remove(ayar.roles.kayıtsız)
                msg.edit(`${member} adlı üye sunucumuza **erkek** olarak kaydedilmiştir.`)
            }

            if (reaction.emoji.id == '848889431716528158') { //kız
                member.setNickname(`${isim} | ${yaş}`).catch();

                let kadinRol = message.guild.roles.cache.get(KızRol);
            if (kadinRol) {
                member.roles.cache.has(BoosterRol) ? member.roles.set([BoosterRol, KızRol]) : member.roles.set([KızRol]);
            }
                return msg.edit(`${member} adlı üye sunucumuza **kadın** olarak kaydedilmiştir.`)
            }
        })
    }

    module.exports.configuration = {
        name: "Kayıt",
        aliases: ["k"],
        usage: "Kayıt @üye [isim] [yaş]"
    };
