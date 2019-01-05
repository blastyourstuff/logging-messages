const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('./config.json')

bot.on("messageUpdate", async (oldmsg, newmsg) => {
    if (oldmsg.author.bot && config.ignore_bots || oldmsg.author.id == bot.user.id) return

    let log_channel = oldmsg.guild.channels.get(config.logging_channel_id)
    if (!log_channel) return console.log('Logging channel not installed, or wrong ID is specified')

    let textOldMessage = oldmsg.content.slice(0, 600), textNewMessage = newmsg.content.slice(0, 600) // Max. length in field: 1024
    if (textOldMessage.length >= 600) textOldMessage += '...'
    if (textNewMessage.length >= 600) textNewMessage += '...'

    try {
        let embed = new Discord.RichEmbed()
            .setTitle('Сообщение изменено')
            .addField('Отправитель', oldmsg.member, true)
            .addField('Канал', oldmsg.channel.name, true)
            .addField('Раньше', textOldMessage.length > 0 ? textOldMessage : '\u200B')
            .addField('Сейчас', textNewMessage.length > 0 ? textNewMessage : '\u200B')
            .setFooter(`ID Сообщения: ${oldmsg.id}`)
            .setTimestamp()
            .setColor(0xE19517)
        await log_channel.send(embed)
    } catch (err) {
        if (['DiscordAPIError: Missing Access', 'DiscordAPIError: Missing Permissions'].some(e => e == err)) console.log(`[Missing Permissions]: There are no required permissions in channel ${log_channel.name}`)
        else console.log('[Error]: An unexpected error has occurred', err)
    }
})

bot.on("messageDelete", async message => {
    if (message.author.bot && config.ignore_bots || message.author.id == bot.user.id) return

    let log_channel = message.guild.channels.get(config.logging_channel_id)
    if (!log_channel) return console.log('Logging channel not installed, or wrong ID is specified')

    let textMessage = message.content.slice(0, 600) // Max. length in field: 1024
    if (textMessage.length >= 600) textMessage += '...'

    try {
        let embed = new Discord.RichEmbed()
            .setTitle('Сообщение удалено')
            .addField('Отправитель', message.member, true)
            .addField('Канал', message.channel.name, true)
            .addField('Содержимое', textMessage.length > 0 ? textMessage : '\u200B')
            .setFooter(`ID Сообщения: ${message.id}`)
            .setTimestamp()
            .setColor(0xF04747)
        await log_channel.send(embed)
    } catch (err) {
        if (['DiscordAPIError: Missing Access', 'DiscordAPIError: Missing Permissions'].some(e => e == err)) console.log(`[Missing Permissions]: There are no required permissions in channel ${log_channel.name}`)
        else console.log('[Error]: An unexpected error has occurred', err)
    }
})

bot.on("guildMemberAdd", async member => {
    if (member.user.bot && config.ignore_bots) return

    let log_channel = member.guild.channels.get(config.logging_channel_id)
    if (!log_channel) return console.log('Logging channel not installed, or wrong ID is specified')

    try {
        let embed = new Discord.RichEmbed()
            .setTitle(member.user.bot ? 'Бот добавлен' : 'Участник присоединился')
            .setDescription(`${member.user.username}#${member.user.discriminator} (${member})`)
            .addField('Участников', member.guild.memberCount, true)
            .addBlankField(true)
            .setFooter(`ID Участника: ${member.id}`)
            .setTimestamp()
            .setColor(0x43B581)
        await log_channel.send(embed)
    } catch (err) {
        if (['DiscordAPIError: Missing Access', 'DiscordAPIError: Missing Permissions'].some(e => e == err)) console.log(`[Missing Permissions]: There are no required permissions in channel ${log_channel.name}`)
        else console.log('[Error]: An unexpected error has occurred', err)
    }
})

bot.on("guildMemberRemove", async member => {
    if (member.user.bot && config.ignore_bots) return

    let log_channel = member.guild.channels.get(config.logging_channel_id)
    if (!log_channel) return console.log('Logging channel not installed, or wrong ID is specified')

    try {
        let embed = new Discord.RichEmbed()
            .setTitle(member.user.bot ? 'Бот добавлен' : 'Участник присоединился')
            .setDescription(`${member.user.username}#${member.user.discriminator} (${member})`)
            .addField('Участников', member.guild.memberCount, true)
            .addBlankField(true)
            .setFooter(`ID Участника: ${member.id}`)
            .setTimestamp()
            .setColor(0xF04747)
        await log_channel.send(embed)
    } catch (err) {
        if (['DiscordAPIError: Missing Access', 'DiscordAPIError: Missing Permissions'].some(e => e == err)) console.log(`[Missing Permissions]: There are no required permissions in channel ${log_channel.name}`)
        else console.log('[Error]: An unexpected error has occurred', err)
    }
})

bot.on("guildMemberUpdate", async (before, after) => {
    if (before.user.bot && config.ignore_bots) return

    let log_channel = before.guild.channels.get(config.logging_channel_id)
    if (!log_channel) return console.log('Logging channel not installed, or wrong ID is specified')

    if (before.nickname != after.nickname) {
        try {
            let embed = new Discord.RichEmbed()
                .setTitle('Никнейм изменен')
                .setDescription(`Участник ${before}`)
                .addField('Раньше', before.nickname ? before.nickname : '?', true)
                .addField('Сейчас', after.nickname ? after.nickname : '?', true)
                .setFooter(`ID Участника: ${before.id}`)
                .setTimestamp()
                .setColor(0xE19517)
            await log_channel.send(embed)
        } catch (err) {
            if (['DiscordAPIError: Missing Access', 'DiscordAPIError: Missing Permissions'].some(e => e == err)) console.log(`[Missing Permissions]: There are no required permissions in channel ${log_channel.name}`)
            else console.log('[Error]: An unexpected error has occurred', err)
        }
    }

    if (before.roles.size < after.roles.size) {
        try {
            let embed = new Discord.RichEmbed()
                .setTitle('Роль выдана')
                .setDescription(`Участник ${before}`)
                .addField('Ролей', after.roles.size, true)
                .addBlankField(true)
                .setFooter(`ID Участника: ${before.id}`)
                .setTimestamp()
                .setColor(0x43B581)
            await log_channel.send(embed)
        } catch (err) {
            if (['DiscordAPIError: Missing Access', 'DiscordAPIError: Missing Permissions'].some(e => e == err)) console.log(`[Missing Permissions]: There are no required permissions in channel ${log_channel.name}`)
            else console.log('[Error]: An unexpected error has occurred', err)
        }
    }

    if (before.roles.size > after.roles.size) {
        try {
            let embed = new Discord.RichEmbed()
                .setTitle('Роль убрана')
                .setDescription(`Участник ${before}`)
                .addField('Ролей', after.roles.size, true)
                .addBlankField(true)
                .setFooter(`ID Участника: ${before.id}`)
                .setTimestamp()
                .setColor(0xF04747)
            await log_channel.send(embed)
        } catch (err) {
            if (['DiscordAPIError: Missing Access', 'DiscordAPIError: Missing Permissions'].some(e => e == err)) console.log(`[Missing Permissions]: There are no required permissions in channel ${log_channel.name}`)
            else console.log('[Error]: An unexpected error has occurred', err)
        }
    }
})

bot.login(config.token)
bot.on("ready", async () => {
    let presence = config.presence
    await bot.user.setPresence({
        status: presence.status,
        game: {
            name: presence.game_name,
            type: presence.type,
            url: presence.game_url ? presence.game_url : null
        }
    })
    .then(console.log(`[Presence]: Status successfully installed`))
    .catch(console.error)

    await console.log(`[Start]: ${bot.user.username} connected to Discord`)
})