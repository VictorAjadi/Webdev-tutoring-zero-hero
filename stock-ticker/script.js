import stocks from "./data.js";
const stockName = document.getElementById("stock-name");
const stockSymbol = document.getElementById("QTA");
const stockPrice = document.getElementById("stock-price");
const stockTime = document.getElementById("stock-time");
const ticker = document.getElementById("ticker");
setInterval(function(){
    const randomStock = stocks[Math.floor(Math.random() * stocks.length)];
    stockName.textContent=randomStock.name;
    stockPrice.textContent=randomStock.price.toFixed(2);
    stockTime.textContent=randomStock.time;
    stockSymbol.textContent=randomStock.symbol;
    if(randomStock.inflate){
        ticker.classList.add("triangle-green");
        ticker.classList.remove("triangle-red");
    }else{
        ticker.classList.remove("triangle-green");
        ticker.classList.add("triangle-red");
    }
}, 2000);