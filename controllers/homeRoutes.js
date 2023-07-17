const router = require('express').Router();
const { User } = require('../models')
const { Stock }  = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
const apikey = "2d39de05a6c0431c871588b30dec7652"

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll();

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
  console.log(req.session)
});

router.get('/portfolio/:name', /* withAuth, */ async (req, res) => {
  try {
  const userData = await User.findByPk(res.params.name);
  const user = userData.map((profile) => profile.get({ plain: true }));
    res.render('portfolio', {
      user,
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

router.get('/stock', withAuth, async (req,res)=>{
  console.log(`req query`, req.query)
  var url = 'https://api.twelvedata.com/symbol_search?symbol=' + req.query.search + '&apikey=' + apikey;
  var response = await axios.get(url);
  var filteredData = response.data.data.filter(stock => stock.country == "United States"); 
  // console.log(filteredData)
  res.render('stock',{
    stocks: filteredData,
    logged_in: req.session.logged_in
  });
});

router.get('/quote', async (req, res) => {
  // console.log(`req query`, req.query)
  var url = 'https://api.twelvedata.com/quote?symbol=' + req.query.symbol + '&apikey=' + apikey;
  var response = await axios.get(url);
  // console.log(response.data)
  var data = response.data;
  res.render('quote',{
    data: data
  })
})

module.exports = router;
