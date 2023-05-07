import { functions } from "../../utils/functions.js"
import { bot, db } from "../../bot.js"

export default async function pin(convo, ctx) {
    try {
        /* Access the collection in MongoDB */
        const tastingColl = db.collection('tasting_sessions')

        /* Getting inputs for the user */
        await ctx.reply("📋 Enter the details of the tasting session 📋")
        const locationText = await functions.validateTastingInput(convo, ctx, 'location')
        const dateText = await functions.validateTastingInput(convo, ctx, 'date')
        const timeText = await functions.validateTastingInput(convo, ctx, 'time')
        
        /* Construct summary message of tasting session */
        const finalMsg = await bot.api.sendMessage(
            ctx.update.message.chat.id,
            `👦 Host: ${ctx.update.message.from.first_name}\n` +
            `📍 Location: ${functions.htmlGoogleMapSearchLink(locationText)}\n` +
            `📅 Date: ${dateText}\n` +
            `⌛ Time: ${timeText}H`,
            { parse_mode: "HTML" }
        )

        /* Pin Message in chat */
        await bot.api.pinChatMessage(ctx.update.message.chat.id, finalMsg.message_id)
        
        /* Insert entry to MongoDB */
        await tastingColl.insertOne({
            host: ctx.update.message.from.first_name,
            location: locationText,
            date: dateText,
            time: timeText
        })
    } catch {
        console.log('Error! Something went wrong')
    }
}