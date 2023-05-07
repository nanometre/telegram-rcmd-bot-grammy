import { functions } from "../../utils/functions.js"
import { botReplies } from "../../utils/constant.js"

export default async function recommend(ctx) {
    /* Select a random message to reply */
    const message = functions.selectRandomFromArray(botReplies.recommendations)

    /* Reply to the user */
    await ctx.reply(message, {
        reply_to_message_id: ctx.msg.message_id
    })
}