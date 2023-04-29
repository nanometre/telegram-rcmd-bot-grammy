import { functions } from "../../utils/functions.js"
import { bot } from "../../bot.js"

export default async function pin(convo, ctx) {
    await ctx.reply("📋 Enter the details of the tasting session 📋")

    const locationText = await functions.validateTastingInput(convo, ctx, 'location')
    const dateText = await functions.validateTastingInput(convo, ctx, 'date')
    const timeText = await functions.validateTastingInput(convo, ctx, 'time')

    const finalMsg = await bot.api.sendMessage(
        ctx.update.message.chat.id,
        `👦 Host: ${ctx.update.message.from.first_name}\n` +
        `📍 Location: ${functions.htmlGoogleMapSearchLink(locationText)}\n` +
        `📅 Date: ${dateText}\n` +
        `⌛ Time: ${timeText}`,
        { parse_mode: "HTML" }
    )
    await bot.api.pinChatMessage(ctx.update.message.chat.id, finalMsg.message_id)
}