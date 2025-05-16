// coins to display
const coinsWanted = ['BTC', 'ETH', 'LTC', 'XRP', 'DOGE', 'ADA', 'SOL', 'LINK', 'USDT', 'BNB'];
// DOM elements
const grid = document.getElementById('CryptoPrices');
const currency = document.getElementById('currency');

//api key
const apiKey = CONFIG.API_KEY;





async function fetchCryptoPrices() {

    //url and create the request string and currency value
    const selectedCurrency = currency.value;
    const symbols = coinsWanted.join(',');
    const url = `https://api.coinlayer.com/api/live?access_key=${apiKey}&symbols=${symbols}&target=${selectedCurrency}`;

    try {
        const reponse = await fetch(url);
        const data = await reponse.json();

        if (data.success) {
            grid.innerHTML = ''; // Clear previous data
            // loops through element, rates reutrns key valye like ' BTC': 23400 so doing .entires turns rates into key value
            Object.entries(data.rates).forEach(([symbol,price]) =>{
                const card = document.createElement('div'); // create a box for card
                card.className = 'card'; // add class to card so i can make css easier
                card.innerHTML = `
                    <h2>${symbol}</h2>
                    <div class="price">
                        <span class="label">${selectedCurrency}:</span>
                        <span class="amount">${price.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                    </div>
                    `;

                grid.appendChild(card); // append to the grid
            }); 
        } else {
            throw new Error('Error fetching data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        grid.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
}

    // lets fetch when prices change and update immediately

    currency.addEventListener('change', () => {
        const selectedCurrency = currency.value;
        fetchCryptoPrices(selectedCurrency);
    
    });

    //first fetch

    fetchCryptoPrices();
