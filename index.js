const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.token, //Find in the Oauth  & Permissions tab
    signingSecret: process.env.signingSecret, // Find in Basic Information Tab
    socketMode:true,
    appToken: process.env.appToken // Token from the App-level Token that we created
});

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
        let channelId = process.env.channelId;

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