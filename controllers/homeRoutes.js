const router = require('express').Router();
const { User } = require('../models')
const { Stock }  = require('../models');
const { OwnedStock }  = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
const apikey = "2d39de05a6c0431c871588b30dec7652"

router.get('/', withAuth, async (req, res) => {
  console.log("hello, world");
  try {
    const user_id= req.session.user_id;
    const usersData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = usersData.map((project) => project.get({ plain: true }));
    console.log(users);
    const userData = await User.findOne({
      where:{
        id: user_id
      },
      attributes: { exclude: ['password'] },
    })
     console.log(userData)

     // query OwnedStock table to find all entries where owner_id = user's id
  /* const ownedData = await OwnedStock.findAll({
    where:{
      owner_id: userData.dataValues.id
    }
  })
  // quuery stock table to find all stocks where the ids match
  const ownedstocks = ownedData.map((stock) => stock.get({ plain: true }));
  // console.log(ownedstocks)
  var stocks = [];
  for(var i = 0; i< ownedstocks.length; i++){
    const stockData = await Stock.findOne({
      where:{
        id:ownedstocks[i].stock_id
      }
    })
    stocks.unshift(stockData)
    }
    console.log(stocks[0].dataValues) */
    
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
      user: userData.dataValues.name,
      /* stocks:stocks, */
    });
  } catch (err) {
    res.status(500).json(err);
  }
  console.log('hello')
});

router.get('/stock', withAuth, async (req,res)=>{
  // console.log(`req query`, req.query)
  var url = 'https://api.twelvedata.com/symbol_search?symbol=' + req.query.search + '&apikey=' + apikey;
  var response = await axios.get(url);
  var filteredData = response.data.data.filter(stock => stock.country == "United States"); 
  // console.log(filteredData)
  res.render('stock',{
    stocks: filteredData,
    logged_in: req.session.logged_in,
  });
});

router.get('/quote', withAuth, async (req, res) => {
  // const user_id= req.session.user_id;
  // console.log(`req query`, req.query)
  var url = 'https://api.twelvedata.com/quote?symbol=' + req.query.symbol + '&apikey=' + apikey;
  var response = await axios.get(url);
  // console.log(response.data)
  var data = response.data;
  var open = parseFloat(data.open).toFixed(2);
  var close = parseFloat(data.close).toFixed(2);
  var high = parseFloat(data.high).toFixed(2);
  var low = parseFloat(data.low).toFixed(2);
  res.render('quote',{
    data: data,
    open: open,
    close: close,
    high: high,
    low: low,
    logged_in: req.session.logged_in,
  });
});

router.get('/about', withAuth, async (req, res) => {
  res.render('about', { logged_in: req.session.logged_in});
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
