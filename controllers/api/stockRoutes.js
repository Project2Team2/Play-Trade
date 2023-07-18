'use strict';
const router = require('express').Router();
const axios = require('axios')
const {Stock} = require('../../models')
const {OwnedStock} = require('../../models')
const apikey = "2d39de05a6c0431c871588b30dec7652"

router.post('/', async (req, res) => {
  try {
    const dbStockData = await Stock.create({
    //  pass the fields from the req.body to correspond with the model
    name: req.body.name,
    close_price: req.body.closePrice,
    symbol: req.body.symbol
    });
    const userData = await User.findOne({
      where:{
        id: user_id
      },
      attributes: { exclude: ['password'] },
    })
    
    const ownedStockData = await OwnedStock.create({
      owner_id: userData.dataValues.name, 
      stock_id: dbStockdata.id,
    })
    res.status(200).json(dbStockData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
