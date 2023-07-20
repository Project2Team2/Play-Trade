const router = require('express').Router();
const {Stock} = require('../../models')
const {OwnedStock} = require('../../models')
const {User} = require('../../models')

router.post('/', async (req, res) => {
  try {
    
    const dbStockData = await Stock.create({
    //  pass the fields from the req.body to correspond with the model
    name: req.body.name,
    close_price: req.body.closePrice,
    symbol: req.body.symbol,
    shares_owned: req.body.numShares
    });
  
    
    const ownedStockData = await OwnedStock.create({
      owner_id: req.session.user_id, 
      stock_id: dbStockData.id
    })
    res.status(200).json(dbStockData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
