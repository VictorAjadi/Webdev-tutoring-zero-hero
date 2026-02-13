import OpenAi from "openai"
let tickerArr = []
const generateReportBtn = document.getElementById("report-btn")
const stockForm = document.getElementById("stock-form")
const messageDiv = document.getElementById("message-div")
const actionPanel = document.getElementById("action-panel")
const stockReport = document.getElementById("stock-report")
const reportLoading = document.getElementById("report-loading")

const POLYGON_API_KEY = ""
const OPEN_AI_API_KEY = ""
stockForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const tickerInput = document.getElementById("ticker-input")
    const value = tickerInput.value
    if(value.length>2){
      generateReportBtn.disable=false
      tickerArr.push(value.toUpperCase())
      console.log(tickerArr)
      tickerInput.value=""
      renderTickers()
    }else{
     messageDiv.style.color="red"
     messageDiv.textContent="You must add at least one ticker. A ticker is a 3 letter or more code for a stock. For example, AAPL is the ticker for Apple Inc."
    }
})

function renderTickers(){
    const tickerList = document.getElementById("ticker-list")
    tickerList.innerHTML=""
    tickerArr.forEach(ticker=>{
        const tickerItem = document.createElement("p")
        tickerItem.textContent=ticker
        tickerList.appendChild(tickerItem)
    })
}
generateReportBtn.addEventListener("click",fetchStockData)
async function fetchStockData(){
 actionPanel.style.display="none"
 reportLoading.style.display="block"
 try {
    const stockData = await Promise.all(tickerArr.map(async(ticker)=>{
        const dateRange = daysBefore(3);
        // Use dateRange.before to filter tickers active as of 3 days ago
        const url = `https://api.massive.com/v3/reference/tickers?ticker=${ticker}&market=stocks&active=true&order=asc&limit=100&sort=ticker&date=${dateRange.before}&apiKey=${POLYGON_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json()
        const status = res.status
        if(status===200){
            return JSON.stringify(data.results || data); 
        }else{
            reportLoading.style.display="none"
            throw new Error(`Failed to fetch data for ${ticker}`)
        }
    }))
    reportLoading.style.display="none"
    fetchReport(stockData.join("\n"))
 } catch (error) {
    renderReport(`Failed to fetch datas. Please check the ticker symbol and try again.`,"red")
 }
}

async function fetchReport(stockData){
 const openAi = new OpenAi({
    apiKey: OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true
 })
 const messages = [
    {
        role:"system",
        content:"You are a financial analyst and a trade guru.\
        You will be given stock data over the past 3 days in \
        JSON format. You will analyze the data and provide a \
        report of not more than 150 words on the stock's \
        performance. You will also provide insights on the \
        stock's future performance based on the data provided, \
        recommending whether to buy, hold or sell."
    },
    {
        role:"user",
        content:stockData
    }
 ]
 const res = await openAi.chat.completions.create({
    model:"gpt-3.5-turbo",
    messages
 })
 const answer = res.choices[0].message.content;
 renderReport(answer)
}
function renderReport(reportData, color="black"){
    const p = document.createElement("p")
    p.style = {
        color:color,
        display:"flex",
        height:"50svh",
        margin:"auto"
    }
    p.textContent=reportData
    stockReport.appendChild(p)
}

const daysBefore = (days) => {
    const dateInMs = Date.now();
    const daysDateInMs = days * 24 * 60 * 60 * 1000;
    
    // Helper to format Date object to YYYY-MM-DD
    const format = (date) => date.toISOString().split('T')[0];

    return {
        before: format(new Date(dateInMs - daysDateInMs)),
        now: format(new Date())
    };
};