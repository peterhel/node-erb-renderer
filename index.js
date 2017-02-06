const url = require('url');
const path = require('path');
const fs = require('fs');
const makeSure = require('msjs');

const [, , erbTemplate] = process.argv;

makeSure({
    erbTemplate
}).has('erbTemplate').throw();

let data = '';

function readMetadata() {
    return new Promise(resolve => {
        process.stdin.on('data', _data => {
            data += _data;
        })

        process.stdin.on('end', () => {
            resolve(JSON.parse(data));
        })
    })
}

function render(filename, options) {
    let rendered = [];
    let raw = fs.readFileSync(filename, 'utf8').split('\n');
    raw.forEach(line => {
        let renderedLine = line.replace(/<%=(.+?)%>/, function() {
            let [match, key] = arguments;
            key = key.trim();
            if (/^@/.test(key)) {
                if (options.variables) {
                    return eval(`options.variables.${key.replace('@', '')};`);
                }
            }
            try {
                return eval(`options.${key};`);
            } catch (e) {
                //console.error(e)
            }
            return '';
        });
        rendered.push(renderedLine);
    });

    return rendered.join('\n');
}

readMetadata().then(x => {
    const result = render(erbTemplate, x);
    console.log(result);
});
