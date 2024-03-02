// Подключение необходимых модулей
const express = require('express');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

// Создание экземпляров Express и Telegraf
const app = express();
const bot = new Telegraf('6257572795:AAFCt4xlM0UQ_oYAcIs6Bu_BVMuSPtrB8TQ');

// Настройка Express для обработки JSON и urlencoded данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Путь для обработки POST запросов с сайта
app.post('/send-task', (req, res) => {
    const task = req.body.task; // Получение задачи из запроса
    if (task) {
        // Отправка задачи в Telegram
        bot.telegram.sendMessage("@timjoys", `Новая задача: ${task}`);
        res.send('Задача успешно отправлена!');
    } else {
        res.status(400).send('Пожалуйста, введите задачу!');
    }
});

// Настройка бота
bot.start((ctx) => ctx.reply('Привет! Я бот-планировщик задач. Чтобы отправить задачу, просто введите её текст.'));

bot.on('text', (ctx) => {
    // В данном примере бот просто отвечает на текстовые сообщения
    ctx.reply(`Получено сообщение: ${ctx.message.text}`);
});

// Запуск бота
bot.launch();

// Запуск Express сервера на порту 3000
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
