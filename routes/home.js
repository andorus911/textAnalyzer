const render = require('../lib/render');

function home(request, response) {
    render('index.html', (error, html) =>{
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            return response.end(error.message);
        }

        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(html);
    });
}

module.exports = home;