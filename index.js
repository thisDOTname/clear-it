const { App } = require("@slack/bolt");

console.log('⚡️ Automated deployment');
console.log('> TOKEN : ', 'xoxp-3172215028145-3161931853348-3995792678499-21c6797d9f9746000a06eb3841b48d7c');
console.log('> SIGNING_SECRET : ', '3f8391654e2e054ff2a4ff020f3bbe6e');
console.log('> APP_TOKEN : ', 'xapp-1-A03QW37RM6Y-3981340034439-eb25a64c89f4c2a85d1497e8740e0c1632aad971ff96a25422f8f5daaf0dc9df');

const app = new App({
    token: "xoxp-3172215028145-3161931853348-3995792678499-21c6797d9f9746000a06eb3841b48d7c", //Find in the Oauth  & Permissions tab
    signingSecret: "3f8391654e2e054ff2a4ff020f3bbe6e", // Find in Basic Information Tab
    socketMode:true,
    appToken: "xapp-1-A03QW37RM6Y-3981340034439-eb25a64c89f4c2a85d1497e8740e0c1632aad971ff96a25422f8f5daaf0dc9df" // Token from the App-level Token that we created
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