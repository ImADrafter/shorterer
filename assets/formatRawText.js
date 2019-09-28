function formatRawText(text, intention = 'default') {
    const stylesheet = {
        blue: {
            container: "background-color: rgba(0,0,100,0.2)",
            paragraph: "color: rgb(0,0,100)"
        },
        red: {
            container: "background-color: rgba(100,0,0,0.2)",
            paragraph: "color: rgb(100,0,0)"
        },
        default: {
            container: "background-color: black",
            paragraph: "color: white"
        }
    }
    let style = {
        container: '',
        paragraph: '',
    };

    style.container = stylesheet[intention].container;
    style.paragraph = stylesheet[intention].paragraph;

    return `<div style="${style.container}"><code style=${style.paragraph}>${text}</code></div>`
}

module.exports = formatRawText;