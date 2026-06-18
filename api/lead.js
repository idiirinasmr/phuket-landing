export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, messenger, email, interest } = req.body;

  if (!name || (!messenger && !email)) {
    return res.status(400).json({ error: 'Имя и хотя бы один контакт обязательны' });
  }

  const interestMap = {
    buy: 'Покупка',
    rent: 'Аренда',
    tour: 'Инвест-тур',
    other: 'Другое'
  };

  const contactLine = [
    messenger ? `📱 Мессенджер: ${messenger}` : null,
    email ? `📧 Email: ${email}` : null
  ].filter(Boolean).join('\n');

  const text = `🏠 Новая заявка с лендинга!\n\n👤 Имя: ${name}\n${contactLine}\n📋 Интерес: ${interestMap[interest] || interest}`;

  // Отправка в Telegram
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
      });
    } catch (err) {
      console.error('Telegram error:', err);
    }
  }

  return res.status(200).json({ ok: true });
}
