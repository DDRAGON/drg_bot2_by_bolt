const { App } = require('@slack/bolt');
const cron = require('node-cron');

const lessonInfo = require('./lib/lessonInfo');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});


(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');

  const result = await app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: 'davide_test',
    text: `You can introduce yourself in this channel.`
  });

  cron.schedule('0 50 * * *', () => {
    console.log('came to cron! HAPPY');
    lessonInfo.checkToday(app);
  });
})();