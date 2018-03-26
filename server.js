const http = require('http');

const render = require('./lib/render');
const { home, analyze, notFound } = require('./routes');

http.ServerResponse.prototype.render = render;

http.createServer((request, response) => {
    if (request.url === '/') {
        home(request, response);
    } else if (request.url.startsWith('/analyze')) {
        analyze(request, response);
    } else {
        notFound(request, response);
    }
}).listen(3000, () => console.info('Server online'));