const url = require('url');

const PDFDocument = require('pdfkit');

const urlAnalyze = require('../lib/urlAnalyze');

function analyze(request, response) {
    const urls = url.parse(request.url, true).query.urls.split(' ');

    let promises = [];

    for (let url of urls)
        promises.push(urlAnalyze(url));

    Promise.all(promises)
        .then(values => uploadPDF(values, response))
        .catch(error => console.error(error));
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