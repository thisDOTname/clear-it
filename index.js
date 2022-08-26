const { App } = require("@slack/bolt");

console.log('⚡️ Automated deployment');
console.log('> TOKEN : ', typeof process.env.TOKEN, process.env.TOKEN);
console.log('> SIGNING_SECRET : ', typeof process.env.SIGNING_SECRET, process.env.SIGNING_SECRET);
console.log('> APP_TOKEN : ', typeof process.env.APP_TOKEN, process.env.APP_TOKEN);
console.log('> CHANNEL_ID : ', typeof process.env.CHANNEL_ID, process.env.CHANNEL_ID);

const app = new App({
    token: process.env.TOKEN, //Find in the Oauth  & Permissions tab
    signingSecret: process.env.SIGNING_SECRET, // Find in Basic Information Tab
    socketMode:true,
    appToken: process.env.APP_TOKEN // Token from the App-level Token that we created
});

console.log('> app : ', app);

(async () => {
    await app.start();
    console.log('⚡️ Bolt app started');
  })();

app.command("/clean", async ({ command, ack, say, client }) => {
    try {
      await ack();
      let txt = command.text // The inputted parameters
      // Store conversation history
        let conversationHistory;
        // ID of channel you watch to fetch the history for
        let channelId = process.env.CHANNEL_ID;

        try {
        // Call the conversations.history method using WebClient
        const result = await client.conversations.history({
            channel: channelId
        });

        conversationHistory = result.messages;

        conversationHistory.splice(0, parseInt(txt));
        conversationHistory.forEach(async (h) => {
            try {
                // Call the chat.delete method using the WebClient
                const result = await client.chat.delete({
                  channel: channelId,
                  ts: h.ts,
                  as_user: true
                });
              }
              catch (error) {
                console.error(error);
              }
        })
        }
        catch (error) {
        console.error(error);
        }
    } catch (error) {
      console.log("err")
      console.error(error);
    }
});

// app.start(3000)