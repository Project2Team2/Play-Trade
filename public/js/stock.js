
const searchBox = document.querySelector('#search-input')
const searchBtn = document.querySelector("#search-button");
console.log(searchBox);
console.log(searchBtn);
const searchHandler = async () =>{
    const searchVal = searchBox.value.trim();
    
    if(searchVal){
        console.log(`searching for ${searchVal}`)
        const res = await fetch('/api/stocks/search',{
            method: 'POST',
      body: JSON.stringify({ searchVal }),
      headers: { 'Content-Type': 'application/json' },
        });
            document.location.replace('/stock');
    }
}
searchBtn.addEventListener('click', searchHandler)