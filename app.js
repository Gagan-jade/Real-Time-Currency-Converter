let display1 = document.querySelector(".before");
let display2 = document.querySelector(".after");
let resultDiv = document.querySelector(".result");
let searchBar = document.querySelectorAll(".search-bar");
let searchBar1 = document.querySelector(".search-bar-1");
let searchBar2 = document.querySelector(".search-bar-2");
let actualSearch = document.querySelector(".search-bar-3");
let buttons = document.querySelectorAll(".button");
let button1 = document.querySelector(".button-1");
let button2 = document.querySelector(".button-2");
let resultBtn = document.querySelector(".result-button");
let flag = 0;


//Country finder and Converter
(function caller() {
    button1.addEventListener("click", async () => {
        let searchedContent = searchBar1.value.toLowerCase(); //lowercase conversion
        let urlCountries = `https://restcountries.com/v3.1/name/${searchedContent}?fullText=true`;
        baseCodePromise = await myFunc1(urlCountries);
    })
    button2.addEventListener("click", async () => {
        let searchedContent = searchBar2.value.toLowerCase();
        let urlCountries = `https://restcountries.com/v3.1/name/${searchedContent}?fullText=true`;
        targetCodePromise = await myFunc2(urlCountries);
    })
    resultBtn.addEventListener("click", async () => {
        let amount = actualSearch.value;
        if (!isNaN(amount)) {
            try {
                console.log(baseCodePromise);
                console.log(targetCodePromise);
                let urlCurrency = await fetch(`https://v6.exchangerate-api.com/v6/9cd7a6511a2f9d19344c282f/latest/${baseCodePromise}`);
                let urlCurrencyJson = await urlCurrency.json();
                convertedValue = urlCurrencyJson.conversion_rates[targetCodePromise];

                let result = amount * convertedValue;

                resultDiv.textContent = `${amount} ${baseCodePromise} = ${result} ${targetCodePromise}`;
            }
            catch (err) {
                console.log(err);
                resultDiv.textContent = "ERROR";
            }
        }
        else {
            resultDiv.textContent = "ERROR ENTER A VALID NUMBER";
        }
    })
})();

async function myFunc1(urlCountries) {
    let promCountry = await fetch(urlCountries);
    if (promCountry.status > 400) {
        display1.style.backgroundImage = "none";
        display1.textContent = "COUNTRY NOT FOUND! TRY ENTERING FULL NAME OF THAT COUNTRY";
    }
    else {
        flag = 1;
        let jsonCountry = await promCountry.json();
        countryImageFinder1(jsonCountry[0].cca2);
        let currencyName1 = Object.keys(jsonCountry[0].currencies);
        let baseCode = currencyName1[0];
        return baseCode;
    }
}
async function myFunc2(urlCountries) {
    let promCountry = await fetch(urlCountries);
    if (promCountry.status > 400) {
        display2.style.backgroundImage = "none";
        display2.textContent = "COUNTRY NOT FOUND! TRY ENTERING FULL NAME OF THAT COUNTRY";
    }
    else {
        let jsonCountry = await promCountry.json();
        countryImageFinder2(jsonCountry[0].cca2);
        let currencyName2 = Object.keys(jsonCountry[0].currencies);
        let targetCode = currencyName2[0];
        return targetCode;
    }
}

//Country flag finder
function countryImageFinder1(code) {
    let countryImageUrl = `https://flagsapi.com/${code}/shiny/64.png`
    display1.style.backgroundImage = `url(${countryImageUrl})`;
    display1.textContent = '';
}
function countryImageFinder2(code) {
    let countryImageUrl = `https://flagsapi.com/${code}/shiny/64.png`
    display2.style.backgroundImage = `url(${countryImageUrl})`;
    display2.textContent = '';
}

//Styling
searchBar1.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        button1.click();
        searchBar2.focus();
    }
})
searchBar2.addEventListener("keypress", (event) => {
    if (event.key == "Enter"){
        button2.click();
        actualSearch.focus();
    }
})
actualSearch.addEventListener("keypress", (event) => {
    if (event.key == "Enter")
        resultBtn.click();
})
buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "aquamarine"
    })
})
buttons.forEach((button) => {
    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "white"
    })
})
searchBar.forEach((bar) => {
    bar.addEventListener("mouseover", () => {
        bar.style.border = "2px solid aquamarine"
    })
})
searchBar.forEach((bar) => {
    bar.addEventListener("mouseout", () => {
        bar.style.border = "2px solid black"
    })
})

