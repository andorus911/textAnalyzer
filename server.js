const http = require('http');

const { home, notFound } = require('./routes');

http.createServer((request, response) => {
    if (request.url === '/') {
        home(request, response);
    } else {
        notFound(request, response);
    }
}).listen(3000, () => console.info('Server online'));