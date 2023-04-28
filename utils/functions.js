export const functions = {
    selectRandomFromArray: (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
    },

    htmlGoogleMapSearchLink: (string) => {
        const newString = string.replaceAll(" ", "+")
        return `<a href="https://www.google.com/maps/search/${newString}/">${string}</a>`
    },

    isAlphaNumeric: (string) => {
        return /^[ A-Za-z0-9]*$/.test(string)
    },

    validateTastingInput: async (convo, ctx, inputType) => {
        let prompt
        switch (inputType) {
            case "location": 
                prompt = "📍 Location 📍"
                break
            case "date": 
                prompt = "📅 Date 📅"
                break
            case "time":
                prompt = "⌛ Time ⌛"
                break
        }

        await ctx.reply(prompt)
        let msg = await convo.waitFrom(ctx.from)
        while (!functions.isAlphaNumeric(msg.update.message.text)) {
            await ctx.reply("🚫 Invalid Input. No special characters allowed 🚫\n" + prompt)
            msg = await convo.waitFrom(ctx.from)
        }
        return msg.update.message.text
    }
}