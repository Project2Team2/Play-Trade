const router = require('express').Router();
const { User } = require('../models')
const { Stock }  = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
const apikey = "2d39de05a6c0431c871588b30dec7652"

router.get('/', /* withAuth, */ async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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
  console.log(filteredData)
  res.render('stock',{
    stocks: filteredData
  });
});

router.get('/price', async (req, res) => {
  var url = 'https://api.twelvedata.com/price?symbol=' + tickers.toString() + '&apikey=' + apikey;
  var response = await axios.get(url);
  console.log(response)
})

module.exports = router;
