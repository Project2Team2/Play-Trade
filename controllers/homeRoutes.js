const router = require('express').Router();
const { User } = require('../models')
const { Stock }  = require('../models');
const { OwnedStock }  = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');



router.get('/', withAuth, async (req, res) => {
  console.log("hello, world");
  try {
    const user_id= req.session.user_id;
    const usersData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = usersData.map((project) => project.get({ plain: true }));
    const userData = await User.findOne({
      where:{
        id: user_id
      },
      attributes: { exclude: ['password'] },
    })

     // query OwnedStock table to find all entries where owner_id = user's id
  const ownedData = await OwnedStock.findAll({
    where:{
      owner_id: userData.dataValues.id
    }
  })
  // quuery stock table to find all stocks where the ids match
  const ownedstocks = ownedData.map((stock) => stock.get({ plain: true }));

  var stocks = [];
  for(var i = 0; i< ownedstocks.length; i++){
    const stockData = await Stock.findOne({
      where:{
        id:ownedstocks[i].stock_id
      }
    })
    stocks.unshift(stockData)
    }
    
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
      user: userData.dataValues.name,
      stocks:stocks,
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/stock',async (req,res)=>{
  const user_id= req.session.user_id;
  var url = 'https://api.twelvedata.com/symbol_search?symbol=' + req.query.search + '&apikey=' + process.env.API_KEY;
  var response = await axios.get(url);
  var filteredData = response.data.data.filter(stock => stock.country == "United States"); 

  const userData = await User.findOne({
    where:{
      id: user_id
    },
    attributes: { exclude: ['password'] },
  })

  res.render('stock',{
    stocks: filteredData,
    logged_in: req.session.logged_in,
    user: userData.dataValues.name,
  });
});

router.get('/quote', async (req, res) => {
  const user_id= req.session.user_id;
  var url = 'https://api.twelvedata.com/quote?symbol=' + req.query.symbol + '&apikey=' + process.env.API_KEY;
  var response = await axios.get(url);
  var data = response.data;
  var open = parseFloat(data.open).toFixed(2);
  var close = parseFloat(data.close).toFixed(2);
  var high = parseFloat(data.high).toFixed(2);
  var low = parseFloat(data.low).toFixed(2);

  const userData = await User.findOne({
    where:{
      id: user_id
    },
    attributes: { exclude: ['password'] },
  })

  res.render('quote',{
    data: data,
    open: open,
    close: close,
    high: high,
    low: low,
    user: userData.dataValues.name,
  });
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
