console.log("stock.js running on quote view")
const addToPortfolio = async (event) => {
  event.preventDefault();
  
   console.log("front end add to portfolio started")
  
    const name = document.querySelector('#name').innerHTML
    var closePrice = document.querySelector('#closePrice').innerHTML
    const symbol = document.querySelector('#symbol').innerHTML
    var numShares = document.querySelector('#stockNumber').value
    numShares = parseInt(numShares)
    closePrice = closePrice.slice(1)
    closePrice = parseFloat(closePrice)

    console.log(closePrice)
    console.log(numShares)
    if (name && closePrice && symbol && numShares)  {
      
      const response = await fetch('/api/stocks', {
        method: 'POST',
        body: JSON.stringify({ name, closePrice, symbol, numShares }),
        headers: { 'Content-Type': 'application/json' },
        
      });
      if (response.ok) {
        document.location.replace('/');
        console.log('stock added to db');
      } else {
        console.log('failed to add stock to db');
      }
    }
  };
  document.querySelector('#save-btn').addEventListener('click',addToPortfolio);