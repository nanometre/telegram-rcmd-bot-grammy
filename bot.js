import { Bot, session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import dotenv from 'dotenv'

import { pin, start } from './listeners/commands/index.js';
import { recommend } from './listeners/hears/index.js'


/* ========== INITIALISE ========== */
dotenv.config()
export const bot = new Bot(process.env.TELEGRAM_TOKEN);
/* ========== END INITIALISE ========== */


/* ========== MIDDLEWARE SETUP ========== */
/* TODO: Add session storage?*/
bot.use(session({
    initial() {
        return {}
    }
}))

bot.use(conversations())
bot.use(createConversation(pin))
/* ========== END MIDDLEWARE SETUP ========== */


/* ========== LISTENERS ========== */
/* TODO: Add start command for intro to the project */
bot.command('start', async (ctx) => {
    await start(ctx)
})

/* start a converation to pin a message */
bot.command("pin", async (ctx) => {
    await ctx.conversation.enter("pin")
})

/* check if message contains 'recommendation' and its abbreviation, and replies to the message */
bot.hears(/.*r[e]?c[o]?[m]{1,2}[e]?[n]?d.*/i, async (ctx) => {
    await recommend(ctx)
})
/* ========== END LISTENERS ========== */


/* ========== START BOT ========== */
bot.start();
/* ========== END START BOT ========== */