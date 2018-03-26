const render = require('../lib/render');

function notFound(request, response) {
    render('error.html', (error, html) =>{
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            return response.end(error.message);
        }

        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(html);
    });
}

module.exports = notFound;