const max = 50000;
const min = 25000;

function getRandomPrice() {
    return (Math.random() * (max - min) + min).toFixed(2);
}
export default [
    {
        name: "Qtech AI",
        symbol: "QTA",
        price: 100.00,
        time: new Date(Date.now() + Math.floor(getRandomPrice())).toLocaleTimeString(),
        inflate: true
    },
    {
        name: "Green Energy Inc.",
        symbol: "GEI",
        price: 75.50,
        time: new Date(Date.now() + Math.floor(getRandomPrice())).toLocaleTimeString(),
        inflate: false
    },
    {
        name: "HealthTech Solutions",
        symbol: "HTS",
        price: 120.25,
        time: new Date(Date.now() + Math.floor(getRandomPrice())).toLocaleTimeString(),
        inflate: true
    },
    {
        name: "FinTech Innovations",
        symbol: "FTI",
        price: 90.75,
        time: new Date(Date.now() + Math.floor(getRandomPrice())).toLocaleTimeString(),
        inflate: false
    },
    {
        name: "E-Commerce Giants",
        symbol: "ECG",
        price: 150.00,
        time: new Date(Date.now() + Math.floor(getRandomPrice())).toLocaleTimeString(),
        inflate: true
    },
    {
        name: "AutoTech Motors",
        symbol: "ATM",
        price: 80.00,
        time: new Date(Date.now() + Math.floor(getRandomPrice())).toLocaleTimeString(),
        inflate: false
    },
    {
        name: "BioPharma Corp.",
        symbol: "BPC",
        price: 110.50,
        time: new Date(Date.now() + Math.floor(getRandomPrice())).toLocaleTimeString(),
        inflate: true
    },
    {
        name: "Cloud Computing Co.",
        symbol: "CCC",
        price: 95.00,
        time: new Date(Date.now() + Math.floor(getRandomPrice())).toLocaleTimeString(),
        inflate: false
    },
]