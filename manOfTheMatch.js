let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
let request = require("request");
let cheerio = require("cheerio");
console.log("Before");
request(url, cb);
function cb(error, response, html) {
    if(error) {
        console.log(error);
    } else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    let selTool = cheerio.load(html);
    let matchCard = selTool(".match-info-link-FIXTURES");
    

    for(let i = 0; i <matchCard.length; i++){
        //
        let link = selTool(matchCard[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + link;

        getDetails(fullLink);
    }
}

function getDetails(fullLink) {
    request(fullLink , cb);
    function cb(error , response, html){
        if(error) {
            console.log(error);
        } else {
            // let playerDetails = selTool(".best-player-name").text();
            let selTool = cheerio.load(html);
            let eng = selTool(".best-player-name").text();
            console.log(eng);
        }
    }
}