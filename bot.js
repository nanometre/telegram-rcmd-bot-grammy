import { Bot, session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import dotenv from 'dotenv'

import functions from './utils/functions.js';
import { botReplies } from './utils/constant.js';

/* ========== INITIALISE ========== */
dotenv.config()
const bot = new Bot(process.env.TELEGRAM_TOKEN);

/* ========== MIDDLEWARE SETUP ========== */
bot.use(session({
    initial() {
        return {}
    }
}))

bot.use(conversations())
bot.use(createConversation(pin))

/* ========== CONVERSATIONS ========== */
/* /pin conversation */
async function pin(convo, ctx) {
    await ctx.reply("Enter the details of the tasting")

    await ctx.reply("Location 📍:")
    const locationMsg = await convo.waitFrom(ctx.from)
    await ctx.reply("Date 📅:")
    const dateMsg = await convo.waitFrom(ctx.from)
    await ctx.reply("Time ⌛:")
    const timeMsg = await convo.waitFrom(ctx.from)

    const finalMsg = await bot.api.sendMessage(
        ctx.update.message.chat.id,
        `Host 👦: ${ctx.update.message.from.first_name}\n` +
        `Location 📍: ${functions.htmlGoogleMapSearchLink(locationMsg.update.message.text)}\n` +
        `Date 📅: ${dateMsg.update.message.text}\n` +
        `Time ⌛:${timeMsg.update.message.text}`,
        { parse_mode: "HTML" }
    )
    await bot.api.pinChatMessage(ctx.update.message.chat.id, finalMsg.message_id)
}

/* ========== LISTENERS ========== */
/* start a converation to pin a message */
bot.command("pin", async (ctx) => {
    await ctx.conversation.enter("pin")
})

/* check if message contains 'recommendation' and its abbreviation, and replies to the message */
bot.hears(/.*r[e]?c[o]?[m]{1,2}[e]?[n]?d.*/i, async (ctx) => {
    const message = functions.selectRandomFromArray(botReplies.recommendations)
    await ctx.reply(message, {
        reply_to_message_id: ctx.msg.message_id
    })
})

/* ========== START BOT ========== */
bot.start();