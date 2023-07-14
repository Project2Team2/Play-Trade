'use strict';
const router = require('express').Router();
const axios = require('axios')
const {Stock} = require('../../models')
const apikey = "2d39de05a6c0431c871588b30dec7652"



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

router.get('/search/:searchVal',async (req,res)=>{
    
    try{
      
      var url = 'https://api.twelvedata.com/symbol_search?symbol=' + req.params.searchVal + '&apikey=' + apikey;
      var response = await axios.get(url);
      
      var filteredData = response.data.data.filter(stock => stock.country == "United States"); 
      for (var i = 0; i < filteredData.length; i++){
        const stock =  await Stock.findOne({
          where:{
            name: filteredData[i].instrument_name
          }
        })
        if(!stock){
          await Stock.create({name:filteredData[i].instrument_name,
            symbol: filteredData[i].symbol,
            price: 0.0,
          })
        }
        
        const stockData =  await Stock.findOne({
          where:{
            name: filteredData[i].instrument_name
          }
        })
        
      }
    res.json(filteredData)

    }catch(err){
        console.log(err);
    res.status(500).json(err);
    }
});
module.exports = router;
