const fs = require('fs');
const path = require('path');

function render(templateName, done) {
    fs.readFile(path.resolve('views', templateName), 'utf-8', (error, html) => {
        if (error) {
            this.writeHead(500, { 'Content-Type': 'text/plain' });
            return this.end(error.message);
        }

        this.writeHead(200, { 'Content-Type': 'text/html' });
        this.end(html);
    })
}

module.exports = render;