> Still in development stage
# Recommendation Bot
A telegram bot for users to organise food tasting session that is recommended by the user, then pin the message in the group chat. Other users can leave reviews on the recommendation after the tasting session. The bot will store information on the tasting session and the reviews in a persistent storage for record keeping

Telegram bot built using grammY and is inspired by an inside joke of my group of friends. Bot is not intended for mass usage, only within a closed group.

### What can the bot do
1. Automated response to a user when user mention the word 'recommend' or its abbreviation.
2. Allow users to pin a message in the chat with details of tasting session.

### How to use the bot
WIP

### Running the bot
Run the bot in debug mode using `npm run dev`. Log messages will be shown in the console

### Feature to implement
1. Validations on message inputs
2. Host bot on a hosting service
3. Connect to a persistent storage to store information on tasting sessions and reviews from other users (besides the recommender)
4. A way to display information of past tasting session. Perhaps in a seperate web application