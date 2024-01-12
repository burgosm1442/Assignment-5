var word = "";
var input = document.getElementById("tinput");
var output = document.getElementById("output");
var message = document.getElementById("message");
var buttons = ["addStart", "addMiddle", "addEnd", "delStart", "delMiddle", "delEnd", "reset"];

function updateButtons() {
    buttons.forEach(function(id) {
        var button = document.getElementById(id);
        if (id.startsWith("add")) {
            button.disabled = input.value === "" || word.length >= 18;
        } else if (id.startsWith("del")) {
            button.disabled = word.length === 0 || input.value === "" || !word.includes(input.value);
        }
    });
}

function updateWord(action) {
    var index = action === "addMiddle" || action === "delMiddle" ? Math.floor(word.length / 2) : action.endsWith("End") ? word.length : 0;
    var oldWord = word;
    if (action.startsWith("add")) {
        word = word.slice(0, index) + input.value + word.slice(index);
        input.value = "";
    } else if (action.startsWith("del")) {
        if (action === "delStart" && word.startsWith(input.value)) {
            word = word.slice(input.value.length);
            input.value = "";
        } else if (action === "delMiddle" && word.charAt(index) === input.value) {
            word = word.slice(0, index) + word.slice(index + 1);
            input.value = "";
        } else if (action === "delEnd" && word.endsWith(input.value)) {
            word = word.slice(0, word.length - input.value.length);
            input.value = "";
        } else {
            message.textContent = "The letter/number doesn't exist at the spot.";
        }
    } else if (action === "reset") {
        word = "";
        input.value = "";
    }
    if (oldWord !== word) {
        message.textContent = ""; // Clear the message if the word was successfully updated
    }
    output.textContent = word;
    input.focus();
    updateButtons();
}

buttons.forEach(function(id) {
    document.getElementById(id).addEventListener("click", function() {
        updateWord(id);
    });
});

input.addEventListener("input", function() {
    message.textContent = ""; // Clear the message after the next input
    updateButtons();
});
updateButtons();
