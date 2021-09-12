const { WebClient } = require('@slack/web-api');

const fajrPrayerTimeGroup = (namaz: string, fajr: string) => {
  const web = new WebClient(process.env.SLACK_API_TOKEN);
  console.log(`${namaz} Time', ${fajr}`);

  (async () => {
    try {
      // Use the `chat.postMessage` method to send a message from this app
      await web.chat.postMessage({
        channel: '#test-prayer-bot',
        text: `${namaz} Namaz Time : ${fajr}`,
      });
      console.log('Message posted!');
    } catch (error) {
      console.log('Slack Error', error);
    }
  })();
};

export default fajrPrayerTimeGroup;

// Reviews
// Slack channel on registraion
