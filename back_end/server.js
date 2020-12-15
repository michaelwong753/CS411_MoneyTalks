var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
 var mysql = require('mysql');
var app = express();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Money Talks." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8087;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log('Money Talks!');
});


// //mysql code
 var con = mysql.createConnection({
   host: "localhost",
   user: "moneytalk_tliber2",
	password: "Car42758663",
   database: "moneytalk_test"
 });

 con.connect(function(err) {
   if (err) throw err;
   console.log("Connected to MySQL!");
 });

//Function InsertStockData
app.post('/api/home', (req, res) => {
  	var dateIN = req.body.dateIN;
  	var highIN = req.body.highIN;
  	var lowIN = req.body.lowIN;
  	var openIN = req.body.openIN;
  	var closeIN = req.body.closeIN;
  	var volumeIN = req.body.volumeIN;
  	var adjCloseIN = req.body.adjCloseIN;
  	var tickerIN = req.body.tickerIN;
var sql = `INSERT INTO teststock (date, high, low, open, close, volume, adjClose, ticker) VALUES ('${dateIN}', ${highIN}, ${lowIN}, ${openIN},${closeIN}, ${volumeIN}, ${adjCloseIN}, '${tickerIN}')`;
  
  con.query(sql, function (err, result) {
	if (err) throw err;
     console.log(result.affectedRows + " record(s) updated");
     toReturn = result;
     toReturn = JSON.stringify(toReturn);
	 res.send(toReturn);
	});
});
  


//Function updateStockData
app.put('/api/home/', (req, res) => {
	var dateIN = req.body.dateIN;
  	var highIN = req.body.highIN;
  	var lowIN = req.body.lowIN;
  	var openIN = req.body.openIN;
  	var closeIN = req.body.closeIN;
  	var volumeIN = req.body.volumeIN;
  	var adjCloseIN = req.body.adjCloseIN;
  	var tickerIN = req.body.tickerIN;


  var sql = `UPDATE teststock SET high = ${highIN}, low = ${lowIN}, open = ${openIN}, close = ${closeIN}, volume = ${volumeIN}, adjClose = ${adjCloseIN} WHERE date = '${dateIN}' AND ticker = '${tickerIN}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
     console.log(result.affectedRows + " record(s) updated");
     toReturn = result;
     toReturn = JSON.stringify(toReturn);
	 res.send(toReturn)					//return toReturn;    
   });

});




//delete stocks
app.post('/api/home/delete',(req, res) => {
  var dateIN = req.body.dateIN;
  var tickerIN = req.body.tickerIN;

  var sql = `DELETE FROM teststock WHERE date = '${dateIN}' AND ticker = '${tickerIN}'`;
   con.query(sql, function (err, result) {
    if (err) throw err;
     console.log(result.affectedRows + " record(s) updated");
     toReturn = result;
     toReturn = JSON.stringify(toReturn);
	 res.send(toReturn)					//return toReturn;    
   });
});

//show 2 stocks
app.post('/api/home/twograph',(req, res) => {
  var firstStocks = req.body.firstStocks;
  var secondStocks = req.body.secondStocks;

  var sql = `SELECT * FROM teststock WHERE ticker = '${firstStocks}' UNION SELECT * from teststock WHERE ticker = '${secondStocks}' ORDER BY date ASC`;
   con.query(sql, function (err, result) {
    if (err) throw err;
     console.log(result.affectedRows + " record(s) updated");
     toReturn = result;
     toReturn = JSON.stringify(toReturn);
	 res.send(toReturn)					//return toReturn;    
   });
});

//inner join stocks and meta stocks
app.post('/api/home/metastocks',(req, res) => {
  var tickerIN = req.body.tickerIN;
  var sql = `SELECT NASDAQ_Symbol,Nasdaq_Traded,Name,Exchange,Market_Category,ETF,Financial_Status,CQS_Symbol,NextShares, MAX(close) as max FROM teststock  JOIN stockmeta ON teststock.ticker = stockmeta.NASDAQ_Symbol WHERE ticker = '${tickerIN}'`
   con.query(sql, function (err, result) {
    if (err) throw err;
     console.log(result.affectedRows + " record(s) updated");
     toReturn = result;
     toReturn = JSON.stringify(toReturn);
	 res.send(toReturn)					//return toReturn;    
   });
});




//show stocks
app.get('/api/home/:tickerIN',(req, res) => {
   var tickerIN = req.params.tickerIN;
   var sql = `SELECT * FROM teststock WHERE ticker = '${tickerIN}' group by date`;
   con.query(sql, function (err, result) {
    if (err) throw err;
     console.log(result.affectedRows + " record(s) updated");
     toReturn = result;
     toReturn = JSON.stringify(toReturn);
	 res.send(toReturn)					//return toReturn;    
   });
});


//show graph
app.post('/api/home/graph',(req, res) => {
   var tickerIN = req.body.tickerIN;
   var sql = `SELECT * FROM teststock WHERE ticker = '${tickerIN}'`;
   
   con.query(sql, function (err, result) {
    if (err) throw err;
     console.log(result.affectedRows + " record(s) updated");
    const jsonData = JSON.parse(JSON.stringify(result));
       
      const csvWriter = createCsvWriter({
      path: "../public_html/pdf/stock.csv",
      header: [
        { id: "date", title: "date" },
        { id: "high", title: "high" },
        { id: "low", title: "low" },
        { id: "open", title: "open" },
        { id: "close", title: "close" },
        { id: "volume", title: "volume" },
        { id: "adjClose", title: "adjClose" },
        { id: "ticker", title: "ticker" }
      ]
    });

    csvWriter
      .writeRecords(jsonData)
      .then(() =>
        console.log("Write to stock.csv successfully!")
      );
        res.json({ message: "Money Talks." });
   });
});

app.post('/api/home/meta',(req, res) => {
   var tickerIN = req.body.tickerIN;
   var sql = `SELECT * FROM stockmeta WHERE NASDAQ_Symbol = '${tickerIN}'`;
      con.query(sql, function (err, result) {
    if (err) throw err;
     console.log(result.affectedRows + " record(s) updated");
    const jsonData = JSON.parse(JSON.stringify(result));
       
      const csvWriter = createCsvWriter({
      path: "../public_html/pdf/meta.csv",
      header: [
        { id: "Nasdaq_Traded", title: "Nasdaq_Traded" },
        { id: "Name", title: "Name" },
        { id: "Exchange", title: "Exchange" },
        { id: "Market_Category", title: "Market_Category" },
        { id: "ETF", title: "ETF" },
        { id: "Financial_Status", title: "Financial_Status" },
        { id: "CQS_Symbol", title: "CQS_Symbol" },
        { id: "NASDAQ_Symbol", title: "NASDAQ_Symbol" },
        { id: "NextShares", title: "NextShares" }
      ]
    });

    csvWriter
      .writeRecords(jsonData)
      .then(() =>
        console.log("Write to meta.csv successfully!")
      );
        res.send(jsonData);
   });
   
});
  
//The new mongodb code since sentiment analysis is already pre-processed
async function main(){
    const url = 'mongodb+srv://testuser:cs411@cluster0.ukcrg.mongodb.net/smData?retryWrites=true&w=majority';
    var collection;
    const client = new MongoClient(url);
    await client.connect();
        
        //GET ALL COMMENTS AND DISPLAY IT ON SERVER (TESTING PURPOSES)
    app.get("/api/comment", async (request, response) => {
            result = await displayAllComments(client)
            response.send(result)
        });
    
    //REQUEST A STOCK NAME INPUT AND SEND THE RELATED COMMENTS TO FRONT_END ()
    app.post("/api/comment", async (request, response) => {
                 commentsOfTicker = await findCommentsOfTicker(client, request.body.tick);
                const csvWriter = createCsvWriter({
                  path: "../public_html/pdf/comments.csv",
                  header: [
                    { id: "Comments", title: "Comments" },
                    { id: "Score", title: "Score" },
                    { id: "Sentiment", title: "Sentiment" },
                    { id: "date", title: "Date" }
                  ]
                });
                csvWriter
                  .writeRecords(commentsOfTicker)
                  .then(() =>
                    console.log("Write to comments.csv successfully!")
                );
                response.send(commentsOfTicker);
            });
}

  
async function findCommentsOfTicker(client, tick) {

    commentsOfTicker = []
    result = await client.db("smData").collection("commentTicker").find({ticker : tick}).toArray();

    if (result) {

        for(z = 0; z < result.length; z++){
            comment = await client.db("smData").collection("comments").findOne({id : result[z]["id"]});
            switch(result[z]["type"]) {
              case 0:
                  result[z]["type"] = "Buy"
                break;
              case 1:
                  result[z]["type"] = "Put"
                break;
              case 2:
                  result[z]["type"] = "Call"
                break;
              case 3:
                  result[z]["type"] = "Sell"
                break;
            }
            let temp = {
                Comments:comment["body"], 
                Score: comment["score"],
                Sentiment: result[z]["type"],
                date: comment["created_utc"]
            }
            commentsOfTicker.push(temp);
        }
    } 

    return commentsOfTicker;

}

async function displayAllComments(client){
    result = await client.db("smData").collection("comments").find({}).toArray();
    return result
}
main()



// ALGORITHM FOR SENTIMENT ANALYSIS

// async function posOrNeg(comment){

//     puts = []; 
//     calls = []; 
//     buy = [];
//     sell = [];

//     listOfSentences = comment.split(".");

//     for (i = 0; i < listOfSentences.length; i++) {
//         current = listOfSentences[i];
//         listOfWords = current.split(" ");
//         // console.log(listOfWords);
//         for (j = 0; j < listOfWords.length; j++) {
//             word = listOfWords[j];
//             // console.log(word);
//             if(word.toUpperCase() === 'BUY' || word.toUpperCase() === 'BUYING' || word.toUpperCase() === "BOUGHT"){
//                 // console.log("buy if entered");
//                 newList = [];
//                 while (j < listOfWords.length){
//                     j++;
//                     if(isTicker(listOfWords[j])){
//                         // console.log(listOfWords[i]);
//                         newList.push(listOfWords[j]);
//                     }else if(listOfWords[j] == "puts" && newList.length > 0){
//                         puts.push(newList);
//                         newList = [];
//                         break;
//                     }else if(listOfWords[j] == "calls" && newList.length > 0){
//                         calls.push(newList);
//                         newList = [];
//                         break;
//                     }
//                 }
//                 // console.log(newList);
//                 buy.push(newList);
//             }

//             else if(word.toUpperCase() == 'SHORT' || word.toUpperCase() == 'SHORTING'){
//                 while (j < listOfWords.length){
//                     j++;
//                     if(isTicker(listOfWords[j])){
//                         sell.push(newWord);
//                     }else{
//                         break;
//                     }
//                 }
//             }

//             else if(word.toUpperCase() == 'SELL' || word.toUpperCase() == 'SOLD' || word.toUpperCase() == 'CLOSE' || word.toUpperCase() == 'CLOSING' || word.toUpperCase() == 'SHORTS'){
//                 newList = [];
//                 while (j < listOfWords.length){
//                     j++;
//                     if(isTicker(listOfWords[j])){
//                         newList.push(listOfWords[j]);
//                     }else if(listOfWords[j] == "puts" && newList.length > 0){
//                         puts.push(newList);
//                         newList = [];
//                         break;
//                     }else if(listOfWords[j] == "calls" && newList.length > 0){
//                         calls.push(newList);
//                         newList = [];
//                         break;
//                     }else if(listOfWords[j] == "shorts" && newList.length > 0){
//                         buy.push(newList);
//                         newList = [];
//                         break;
//                     }
//                 }
//                 sell.push(newList);
//             }

//             else if(isTicker(word)){
//                 newList = [word];
//                 while (j < listOfWords.length){
//                     j++;
//                     if(isTicker(listOfWords[j])){
//                         newList.push(listOfWords[j]);
//                     }else if(listOfWords[j] == "puts" && newList.length > 0){
//                         puts.push(newList);
//                         newList = [];
//                         break;
//                     }else if(listOfWords[j] == "calls" && newList.length > 0){
//                         calls.push(newList);
//                         newList = [];
//                         break;
//                     }else if(listOfWords[j] == "shorts" && newList.length > 0){
//                         buy.push(newList);
//                         newList = [];
//                         break;
//                     }
//                 }
//                 buy.push(newList);
//             }
            
//             }
//           }
      
//         return calls;
// }

// function isTicker(ticker){
//     s_and_p = ['MMM','ABT','ABBV','ACN','ATVI','AYI','ADBE','AMD','AAP','AES','AET',
// 		'AMG','AFL','A','APD','AKAM','ALK','ALB','ARE','ALXN','ALGN','ALLE',
// 		'AGN','ADS','LNT','ALL','GOOGL','GOOG','MO','AMZN','AEE','AAL','AEP',
// 		'AXP','AIG','AMT','AWK','AMP','ABC','AME','AMGN','APH','APC','ADI','ANDV',
// 		'ANSS','ANTM','AON','AOS','APA','AIV','AAPL','AMAT','APTV','ADM','ARNC',
// 		'AJG','AIZ','T','ADSK','ADP','AZO','AVB','AVY','BHGE','BLL','BAC','BK',
// 		'BAX','BBT','BDX','BRK.B','BBY','BIIB','BLK','HRB','BA','BWA','BXP','BSX',
// 		'BHF','BMY','AVGO','BF.B','CHRW','CA','COG','CDNS','CPB','COF','CAH','CBOE',
// 		'KMX','CCL','CAT','CBG','CBS','CELG','CNC','CNP','CTL','CERN','CF','SCHW',
// 		'CHTR','CHK','CVX','CMG','CB','CHD','CI','XEC','CINF','CTAS','CSCO','C','CFG',
// 		'CTXS','CLX','CME','CMS','KO','CTSH','CL','CMCSA','CMA','CAG','CXO','COP',
// 		'ED','STZ','COO','GLW','COST','COTY','CCI','CSRA','CSX','CMI','CVS','DHI',
// 		'DHR','DRI','DVA','DE','DAL','XRAY','DVN','DLR','DFS','DISCA','DISCK','DISH',
// 		'DG','DLTR','D','DOV','DWDP','DPS','DTE','DRE','DUK','DXC','ETFC','EMN','ETN',
// 		'EBAY','ECL','EIX','EW','EA','EMR','ETR','EVHC','EOG','EQT','EFX','EQIX','EQR',
// 		'ESS','EL','ES','RE','EXC','EXPE','EXPD','ESRX','EXR','XOM','FFIV','FB','FAST',
// 		'FRT','FDX','FIS','FITB','FE','FISV','FLIR','FLS','FLR','FMC','FL','F','FTV',
// 		'FBHS','BEN','FCX','GPS','GRMN','IT','GD','GE','GGP','GIS','GM','GPC','GILD',
// 		'GPN','GS','GT','GWW','HAL','HBI','HOG','HRS','HIG','HAS','HCA','HCP','HP','HSIC',
// 		'HSY','HES','HPE','HLT','HOLX','HD','HON','HRL','HST','HPQ','HUM','HBAN','HII',
// 		'IDXX','INFO','ITW','ILMN','IR','INTC','ICE','IBM','INCY','IP','IPG','IFF','INTU',
// 		'ISRG','IVZ','IQV','IRM','JEC','JBHT','SJM','JNJ','JCI','JPM','JNPR','KSU','K','KEY',
// 		'KMB','KIM','KMI','KLAC','KSS','KHC','KR','LB','LLL','LH','LRCX','LEG','LEN','LUK',
// 		'LLY','LNC','LKQ','LMT','L','LOW','LYB','MTB','MAC','M','MRO','MPC','MAR','MMC','MLM',
// 		'MAS','MA','MAT','MKC','MCD','MCK','MDT','MRK','MET','MTD','MGM','KORS','MCHP','MU',
// 		'MSFT','MAA','MHK','TAP','MDLZ','MON','MNST','MCO','MS','MOS','MSI','MYL','NDAQ',
// 		'NOV','NAVI','NTAP','NFLX','NWL','NFX','NEM','NWSA','NWS','NEE','NLSN','NKE','NI',
// 		'NBL','JWN','NSC','NTRS','NOC','NCLH','NRG','NUE','NVDA','ORLY','OXY','OMC','OKE',
// 		'ORCL','PCAR','PKG','PH','PDCO','PAYX','PYPL','PNR','PBCT','PEP','PKI','PRGO','PFE',
// 		'PCG','PM','PSX','PNW','PXD','PNC','RL','PPG','PPL','PX','PCLN','PFG','PG','PGR',
// 		'PLD','PRU','PEG','PSA','PHM','PVH','QRVO','PWR','QCOM','DGX','RRC','RJF','RTN','O',
// 		'RHT','REG','REGN','RF','RSG','RMD','RHI','ROK','COL','ROP','ROST','RCL','CRM','SBAC',
// 		'SCG','SLB','SNI','STX','SEE','SRE','SHW','SIG','SPG','SWKS','SLG','SNA','SO','LUV',
// 		'SPGI','SWK','SBUX','STT','SRCL','SYK','STI','SYMC','SYF','SNPS','SYY','TROW','TPR',
// 		'TGT','TEL','FTI','TXN','TXT','TMO','TIF','TWX','TJX','TMK','TSS','TSCO','TDG','TRV',
// 		'TRIP','FOXA','FOX','TSN','UDR','ULTA','USB','UAA','UA','UNP','UAL','UNH','UPS','URI',
// 		'UTX','UHS','UNM','VFC','VLO','VAR','VTR','VRSN','VRSK','VZ','VRTX','VIAB','V','VNO',
// 		'VMC','WMT','WBA','DIS','WM','WAT','WEC','WFC','HCN','WDC','WU','WRK','WY','WHR','WMB',
//         'WLTW','WYN','WYNN','XEL','XRX','XLNX','XL','XYL','YUM','ZBH','ZION','ZTS'];
        
//         if (s_and_p.includes(ticker)){
//             return true;
//         }else{
//             return false;
//         }

// }










