const https = require('https');
const http = require('http');

function urlAnalyze(urls) {
    // error checks

    urls = urls.urls.split(' ');
    console.log(urls);

    let table = [];

    urls.forEach(url => {
        let protocol;
        if (url.startsWith('https')) protocol = https;
        else protocol = http;
        
        protocol.get(url, response => {
            // error checks

            response.setEncoding('utf-8');

            let body = '';

            response.on('data', data => body += data);

            response.on('end', () => {
                text = body.replace(/<\/?[^>]+(>|$)/g, "")
                .split(/[^а-яА-Яa-zA-Z0-9]/g)
                .filter(word => word.length > 4);

                //console.log(text);

                let words = collectWordStatistics(text).sort((a, b) => b.entries - a.entries);

                console.log(words);
                table = table.concat({
                    url,
                    words
                });
                console.log(table.words);
            });
        });
        console.log("after protocol get");
    });
    console.log("after foreach");
}

function collectWordStatistics(allWords) {
    let statistics = [];
    allWords.forEach(word => {
        if (!statistics.find(element => {
            if (element.wordName === word) {
                element.entries ++;
                return true;
            } else return false;
        })) statistics.push({ wordName: word, entries: 1 });
    });
    return statistics;
}

module.exports = urlAnalyze;