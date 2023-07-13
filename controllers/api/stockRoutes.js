'use strict';
const router = require('express').Router();
var request = require('request');
const {Stock} = require('../../models')
const apikey = "2d39de05a6c0431c871588b30dec7652"

async function symbolSearch(searchquery){
    var results = [];
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
          // console.log(data.data[0]);
          for(var i = 0; i < data.data.length; i++){
            if(data.data[i].country == "United States"){
              // console.log(data.data[i].instrument_name)
              results.unshift(data.data[i])
            }
          }

        }
        console.log(results)
    });
    
    // return results;
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



router.post('/search',(req,res)=>{
    
    try{
      symbolSearch(req.body.searchVal);
      res.json({message: "search successful"})

    }catch(err){
        console.log(err);
    res.status(500).json(err);
    }
})
module.exports = router;
