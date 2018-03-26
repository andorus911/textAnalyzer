const fs = require('fs');
const path = require('path');

function render(templateName, done) {
    fs.readFile(path.resolve('views', templateName), 'utf-8', (error, html) => {
        if (error) return done(error);

        done(null, html);
    })
}

module.exports = render;