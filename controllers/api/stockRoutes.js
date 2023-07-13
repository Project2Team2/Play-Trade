'use strict';
const router = require('express').Router();
var request = require('request');
const apikey = "2d39de05a6c0431c871588b30dec7652"

async function symbolSearch(searchquery){
    var url = 'https://api.twelvedata.com/symbol_search?symbol=' + searchquery + '&apikey=' + apikey;
    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
        } else {
          console.log(data);
        }
        
    });
}

async function CheckPrices(tickers)
{
var url = 'https://api.twelvedata.com/price?symbol=' + tickers.toString() + '&apikey=' + apikey;

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      console.log(data);
    }
    
});

}

router.get('/',(req,res)=>{
    res.status(200).json(res)
})

router.post('/search',(req,res)=>{
    
    try{

    }catch(err){
        console.log(err);
    res.status(500).json(err);
    }
})
module.exports = router;
