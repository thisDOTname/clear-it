const { App } = require("@slack/bolt");

console.log('⚡️ Automated deployment');
console.log('> TOKEN : ', typeof process.env.TOKEN, process.env.TOKEN);
console.log('> SIGNING_SECRET : ', typeof process.env.SIGNING_SECRET, process.env.SIGNING_SECRET);
console.log('> APP_TOKEN : ', typeof process.env.APP_TOKEN, process.env.APP_TOKEN);
console.log('> CHANNEL_ID : ', typeof process.env.CHANNEL_ID, process.env.CHANNEL_ID);

const app = new App({
    token: "xoxp-3172215028145-3161931853348-3995847437202-155a910114106c92397c50c2cbef3e6a", //Find in the Oauth  & Permissions tab
    signingSecret: "3f8391654e2e054ff2a4ff020f3bbe6e", // Find in Basic Information Tab
    socketMode:true,
    appToken: "xapp-1-A03QW37RM6Y-3837075872550-d655e7e0a2b2aef36b143d5a86f6c493fcb5835501b9e5d0ffbae8f9cc4518c4" // Token from the App-level Token that we created
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
        let channelId = "C034GUBABL6";

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