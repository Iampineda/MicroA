
const http = require("http");

const host = 'localhost';
const port = 8080;

// INFO From: https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=QQQ&interval=5min&apikey=1EABWCSPSXPVDKOA';


// Request and Response 
const requestListener = function (req, res) {

    res.setHeader("Content-Type", "application/json");

    var returnMessage = ""
    fetch(url).then(data => data.json().then(data => {

        res.writeHead(200);

        var currDate = data['Meta Data']["3. Last Refreshed"]
        var stockInfo = data['Time Series (5min)'][currDate]['1. open']
        returnMessage =    "$" + stockInfo + " " + currDate 
    
        res.end(`{"Data": "${returnMessage}"}`);
    
    })).catch(err => console.log(err))
      
};

// SERVER 
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});





















// Fetching From ALPHA-ADVANTAGE
// fetch(url).then(data => data.json().then(data => {

//     var currDate = data['Meta Data']["3. Last Refreshed"]
//     var stockInfo = data['Time Series (5min)'][currDate]['1. open']
//     var returnMessage = currDate + " $" + stockInfo

//     console.log(returnMessage)

// })).catch(err => console.log(err))
