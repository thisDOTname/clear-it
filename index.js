const { App } = require("@slack/bolt");


const app = new App({
    token: "xoxp-3172215028145-3161931853348-3844258473042-20120d2e943696e975538be7db646785", //Find in the Oauth  & Permissions tab
    signingSecret: "3f8391654e2e054ff2a4ff020f3bbe6e", // Find in Basic Information Tab
    socketMode:true,
    appToken: "xapp-1-A03QW37RM6Y-3837075872550-d655e7e0a2b2aef36b143d5a86f6c493fcb5835501b9e5d0ffbae8f9cc4518c4" // Token from the App-level Token that we created
});

(async () => {
    await app.start();
    console.log('⚡️ Bolt app started');
  })();

app.command("/clean", async ({ command, ack, say, client }) => {
    try {
      await ack();
      let txt = command.text // The inputted parameters
      console.log('/n> txt : ', txt)
      // say("Hello world")
      /* if(isNaN(txt)) {
          say(txt + " is not a number")
      } else {
          say(txt + " squared = " + (parseFloat(txt) * parseFloat(txt)))
      } */
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

        // Print results
        console.log(conversationHistory.length + " messages found in " + channelId);
        // console.log('\n> conversationHistory : ', conversationHistory);
        const historyToDelete = conversationHistory.splice(0, parseInt(txt));
        console.log('\n> conversationHistory : ', conversationHistory);
        console.log('\n\n> historyToDelete : ', historyToDelete);
        conversationHistory.forEach(async (h) => {
            try {
                // Call the chat.delete method using the WebClient
                const result = await client.chat.delete({
                  channel: channelId,
                  ts: h.ts,
                  as_user: true
                });
                console.log(result);
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