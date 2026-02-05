/* document.getElementById("count-el").innerText = 5; */
const count_element = document.getElementById("count-el");
let count = Number(count_element.innerText);
let adjustBy =1;
let plusBtn = document.getElementById("plus-btn");
let minusBtn = document.getElementById("minus-btn");
let resetBtn = document.getElementById("reset-btn");
let inputEl = document.getElementById("input-el");
let previousEntry = document.getElementById("previous-entries");
let previousEntries = "";
plusBtn.addEventListener("click", function() {
    count = count + adjustBy;
    count_element.innerText = count;
    updateInputEl();
    updatePreviousEntries();
});

minusBtn.addEventListener("click", function() {
    if (count > 0) {
        count = count - adjustBy;
        count_element.innerText = count;
    }
    updateInputEl();
    updatePreviousEntries();
});

resetBtn.addEventListener("click", function() {
    count = 0;
    adjustBy = 1;
    count_element.innerText = count;
    updatePreviousEntries(true);
});

inputEl.addEventListener("change", function(e) {
    let newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
        adjustBy = newValue;
    }
});
function updateInputEl(){
    inputEl.value = adjustBy;
}
function updatePreviousEntries(reset=false){
    if(reset){
        previousEntries = "";
    }else{
        previousEntries = previousEntry.textContent + count + " - ";
    }
    previousEntry.textContent = previousEntries; 
}