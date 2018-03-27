const https = require('https');
const http = require('http');

const stripHtml = require('string-strip-html');
const decode = require('parse-entities');

function urlAnalyze(url) {
    return new Promise((resolve, reject) => {
        console.log(url);
        if (!url.startsWith('http')) reject('Wrong protocol: ' + url);

        let protocol;
        if (url.startsWith('https')) protocol = https;
        else protocol = http;
        
        protocol.get(url, response => {
            response.setEncoding('utf-8');

            let body = '';

            response.on('data', data => body += data);

            response.on('end', () => {
                let text = body.concat('');
                text = decode(stripHtml(text.replace(/<script[^>]*>.*?<\/script>/gi,'')), {
                    ignoreTags: [],
                    stripTogetherWithTheirContents: ['script', 'style', 'xml'],
                })
                .split(/[^а-яА-Яa-zA-Z0-9]/g)
                .filter(word => word.length > 4);

                let words = collectWordStatistics(text).sort((a, b) => b.entries - a.entries);

                resolve({
                    url,
                    bestOfTheBest: Array.of(
                        words[0].wordName,
                        words[1].wordName,
                        words[2].wordName)
                });
            });

            response.on('error', error => reject('Stream error: ' + error.message));
        });
    });
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