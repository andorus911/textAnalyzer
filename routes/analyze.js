const url = require('url');
const fs = require('fs');
const eventEmitter = require('events');
const PDFDocument = require('pdfkit');

const urlAnalyze = require('../lib/urlAnalyze');

function analyze(request, response) {

    const emitter = new eventEmitter.EventEmitter();
    const urls = url.parse(request.url, true).query.urls.split(' ');

    let table = [];

    for (let url of urls)
        urlAnalyze(url, analizedWords => {
            table = table.concat({
                url,
                bestOfTheBest: Array.of(
                    analizedWords[0].wordName,
                    analizedWords[1].wordName,
                    analizedWords[2].wordName)
            });
            if (url === urls[0]) emitter.emit('analyze:complete'); // alternatives?
        });

    emitter.on('analyze:complete', () => {
        uploadPDF(table, response);
    });    
}

function uploadPDF(table, response) {
    let doc = new PDFDocument();
    doc.pipe(response);

    doc.font('./fonts/ConsolaMono.ttf');
    table.forEach(row => {
        doc.text(`${row.url} \| ${row.bestOfTheBest}`);
        doc.text(`\n____________________________________________\n`);
    });

    doc.end();
}

module.exports = analyze;