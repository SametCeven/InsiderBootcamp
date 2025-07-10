const counterParagraph = document.getElementsByTagName("p")[0];
const input = document.getElementsByTagName("input")[0];
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");

let counter = 0;
let initialTime = 0;
let timeoutIds = [];


// INPUT
input.addEventListener("change", () => {
    initialTime = input.value;
    counter = initialTime;
})


// START BUTTON
startButton.addEventListener("click", () => {
    timeoutIds.forEach(id => clearTimeout(id));
    for (let i = initialTime; i >= 0; i--) {
        const timeoutId = setTimeout(() => {
            counter = i;
            if (counter === 0) {
                counterParagraph.textContent = "Süre Doldu !";
            }
            else {
                counterParagraph.textContent = counter;
            }
        }, (initialTime - i) * 1000)
        timeoutIds.push(timeoutId);
    }
})


// RESET BUTTON
resetButton.addEventListener("click", () => {
    timeoutIds.forEach(id => clearTimeout(id));
    timeoutIds = [];
    counter = 0;
    counterParagraph.textContent = "Süre Doldu !";
})

