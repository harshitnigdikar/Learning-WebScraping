let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let PDFDocument = require('pdfkit');
let url = "https://github.com/topics";
request(url , cb);
function cb(err , response, html) {
    if(err) {
        console.log(err);
    } else {
        extractData(html);
    }
}

function extractData(html) {
    let selTool = cheerio.load(html);
    let anchors = selTool(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < anchors.length; i++) {
        let link = selTool(anchors[i]).attr("href");
        let fullLink = "https://github.com" + link;
        extractRepodata(fullLink);
    }
}

function extractRepodata(fullLink) {
    request(fullLink, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            getRepoLinks(html);
        }
    }
}
function getRepoLinks(html) {
    let selTool = cheerio.load(html);
    let topicNameElem = selTool(".h1-mktg");
    let repolinks = selTool("a.text-bold").attr("href");
    let topicName = topicNameElem.text().trim();
    console.log(topicName);
}