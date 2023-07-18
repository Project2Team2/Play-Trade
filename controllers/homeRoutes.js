const router = require('express').Router();
const { User } = require('../models')
const { Stock }  = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
const apikey = "2d39de05a6c0431c871588b30dec7652"

router.get('/', /* withAuth, */ async (req, res) => {
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
    console.log(userData)

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
      user:userData.dataValues.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
  console.log(req.session)
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/stock',async (req,res)=>{
  console.log(`req query`, req.query)
  var url = 'https://api.twelvedata.com/symbol_search?symbol=' + req.query.search + '&apikey=' + apikey;
  var response = await axios.get(url);
  var filteredData = response.data.data.filter(stock => stock.country == "United States"); 
  // console.log(filteredData)
  res.render('stock',{
    stocks: filteredData
  });
});

router.get('/quote', async (req, res) => {
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
    low: low
  });
});

module.exports = router;