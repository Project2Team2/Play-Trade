const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name').value.trim();
    const closePrice = document.querySelector('#closePrice').value.trim();
    const symbol = document.querySelector('#symbol').value.trim();
  
    if (name && closePrice && symbol) {
      const response = await fetch('/api/stock', {
        method: 'POST',
        body: JSON.stringify({ name, closePrice, symbol }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // document.location.replace('/');
        console.log('stock added to db');
      } else {
        console.log('failed to add stock to db');
      }
    }
  };
