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

    isValidDate: (string) => {
        /* 
        Matches dd/mm/yyyy, dd-mm-yyyy, dd.mm.yyyy
        Source: https://stackoverflow.com/a/15504877 
        */
        return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(string)
    },

    isValidTime: (string) => {
        /* 
        Matches hh:mm in 24hour format
        Source: https://stackoverflow.com/a/55296990
        */
        return /^(?:[01][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/.test(string)
    },

    validateTastingInput: async (convo, ctx, inputType) => {
        let prompt
        let invalidInputReply = "🚫 Invalid Input 🚫\n"
        let validatorFn

        switch (inputType) {
            case "location": 
                prompt = "📍 Location - No special characters"
                validatorFn = functions.isAlphaNumeric
                break
            case "date": 
                prompt = "📅 Date - dd/mm/yyyy, dd-mm-yyyy, dd.mm.yyyy"
                validatorFn = functions.isValidDate
                break
            case "time":
                prompt = "⌛ Time - hh:mm"
                validatorFn = functions.isValidTime
                break
        }

        await ctx.reply(prompt)
        let msg = await convo.waitFrom(ctx.from)
        while (!validatorFn(msg.update.message.text)) {
            await ctx.reply(invalidInputReply + prompt)
            msg = await convo.waitFrom(ctx.from)
        }
        return msg.update.message.text
    }
}