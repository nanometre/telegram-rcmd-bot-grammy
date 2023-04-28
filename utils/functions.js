export default {
    selectRandomFromArray: (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
    },

    htmlGoogleMapSearchLink: (string) => {
        const newString = string.replaceAll(" ", "+")
        return `<a href="https://www.google.com/maps/search/${newString}/">${string}</a>`
    }
}