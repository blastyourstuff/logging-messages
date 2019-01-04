# Логирование сообщений
Простой способ логирования сообщений в Discord
[<img src="https://discordapp.com/api/guilds/338202622731485185/widget.png?style=shield">](https://discord.gg/bNsgNjC)

# Установка

```
git clone https://github.com/blastyourstuff/logging-messages.git
cd logging-messages
npm install
```

## Конфигурационный файл

```
{
    "token": "токен_бота",
    "logging_channel_id": "id_канала",
    "presence": {
        "game_name": "Discord", // Название игры
        "type": 0, // 0 - "Играет в", 1 - "Стримит", 2 - "Слушает", 3 - "Смотрит"
        "status": "online", // online, idle, dnd, offline
        "game_url": "https://www.twitch.tv/blastyourstuff" // Работает только с type: 1
    },
    "ignore_bots": true // Если установить false, то бот будет реагировать на других ботов
}
```