# Логирование событий
Простой способ логирования событий в Discord

[<img src="https://discordapp.com/api/guilds/338202622731485185/widget.png?style=shield">](https://discord.gg/UYYhhDq)

# Установка

```
git clone https://github.com/blastyourstuff/logging.djs.git
cd logging.djs
npm install
```

## Конфигурационный файл

```
{
    "token": "токен_бота",
    "logging_channel_id": "id_канала",
    "presence": {
        "game_name": "Discord",
        "type": 0,
        "status": "online",
        "game_url": "https://www.twitch.tv/blastyourstuff"
    },
    "ignore_bots": true
}
```