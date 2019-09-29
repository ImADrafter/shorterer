function formatRawText({ url, short_url, date }, intention = 'default') {
    const stylesheet = {
        blue: {
            container: "background-color: rgba(0,0,100,0.2); padding: 5px",
            paragraph: "color: rgb(0,0,100)"
        },
        red: {
            container: "background-color: rgba(100,0,0,0.2); padding: 5px",
            paragraph: "color: rgb(100,0,0)"
        },
        default: {
            container: "background-color: black; padding: 5px",
            paragraph: "color: white"
        }
    };

    let style = {
        container: '',
        paragraph: '',
    };

    style.container = stylesheet[intention].container;
    style.paragraph = stylesheet[intention].paragraph;

    let template = `
    <div style="${style.container}">
       <code style=${style.paragraph}>
           &emsp;url:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;${url}<br />
           &emsp;short_url:&emsp;&emsp;${short_url}<br />
           &emsp;date:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;${date}<br />
        </code>
    </div>`

    return template;
}

module.exports = formatRawText;