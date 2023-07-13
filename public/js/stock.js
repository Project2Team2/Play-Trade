
const searchBox = document.querySelector('#search-input')
const searchBtn = document.querySelector("#search-button");
console.log(searchBox);
console.log(searchBtn);
const searchHandler = async (event) =>{
    event.preventDefault();
    const searchVal = searchBox.ariaValueMax.trim();
    if(searchVal){
        const res = await fetch('/api/stocks/search',{
            method: 'POST',
      body: JSON.stringify({ searchVal }),
      headers: { 'Content-Type': 'application/json' },
        });
        if(res.ok){
            // render stock view
        }
        else{
            // send back to homepage if error
            document.location.replace('/');
        }
    }
}