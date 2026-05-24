

// Login Screen ke elements
let loginBtn = document.querySelector(".login-btn");
let loginBox = document.querySelector(".login-box");
let pinInput = document.querySelector("#pin-input");
let repinInput = document.querySelector("#re-pin-input");

// Main Dashboard (Menu) ke elements
let menu = document.querySelector(".menu");
let changepinBtn = document.querySelector(".change-pin");
let logoutBtn = document.querySelector(".log-out")

// Change PIN Screen ke elements
let changepinBox = document.querySelector(".change-pin-box");
let newPinCreate = document.querySelector(".new-pin-create");
let oldPinInput = document.querySelector("#old-pin");
let newPinInput = document.querySelector("#new-pin");


// EXIT BUTTON
let exitButton = document.querySelector(".exit-button")

exitButton.addEventListener("click",
    function(){
        changepinBox.style.display = "none";
        menu.style.display = "block";
    }
);

//default PIN jo system yaad rakhega
let savedPin = "1234";

//* login BUTTON \\*
loginBtn.addEventListener("click",
    function () {
        let pinValue = pinInput.value.trim();
        let repinValue = repinInput.value.trim();
        if (pinValue === "" || repinValue === "") {
            alert("Error: PIN fields cannot be empty!");
            return;
        }

        if (pinValue.length !== 4 || isNaN(pinValue)) {
            alert("Error: PIN must be exactly 4 digits long!");
            return;
        }

        if (pinValue !== repinValue) {
            alert("Error: PINs do not match. Please re-enter!");
            return;
        }

        if (pinValue !== savedPin) {
            alert("Error: Incorrect PIN! Please try again.");
            pinInput.value = "";
            repinInput.value = "";
            return;
        }

        loginBox.style.display = "none";
        menu.style.display = "block";
        pinInput.value = "";
        repinInput.value = "";
    }
);

//* CHANGE PIN BUTTON \\*
changepinBtn.addEventListener("click", function () {
    menu.style.display = "none";
    changepinBox.style.display = "flex";
});

newPinCreate.addEventListener("click",
    function () {
        let oldPinValue = oldPinInput.value.trim();
        let newPinValue = newPinInput.value.trim();

        if (oldPinValue === "" || newPinValue === "") {
            alert("Error: PIN fields cannot be empty!");
            return;
        }
        if (oldPinValue !== savedPin) {
            alert("Invalid Old PIN! Access denied.");
            return;
        }
        if (oldPinValue.length !== 4 || isNaN(oldPinValue) || (newPinValue.length !== 4 || isNaN(newPinValue))) {
            alert("Error: Both Old and New PINs must be exactly 4 digits and numeric!");
            return;
        }

        if (newPinValue === oldPinValue) {
            alert("New PIN cannot be the same as your Old PIN! Please choose a different PIN.");
            return;
        }

        savedPin = newPinValue;
        oldPinInput.value = "";
        newPinInput.value = "";
        pinInput.value = "";
        repinInput.value = "";
        loginBox.style.display = "flex";
        changepinBox.style.display = "none";
        alert("Success: PIN changed successfully! Please log in with your new PIN.");
    }
);

//* LOGOUT BUTTON \\*
logoutBtn.addEventListener("click",
    function () {
        let ans = confirm("Are you Sure? you want to logout");

        if (ans === true) {
            pinInput.value = "";
            repinInput.value = "";
            menu.style.display = "none";
            loginBox.style.display = "flex";
        }
    }
);

let currentBalance = 25000;
function depositMoney() {
    let depositInput = prompt("Please enter the amount you want to deposit:");

    if (depositInput === null) {
        return;
    }

    let userAmount = Number(depositInput);

    if (isNaN(userAmount)) {
        alert("Invalid input! Please enter a valid number.");
        return;
    }

    if (userAmount <= 0) {
        alert("Transaction failed! Please enter an amount greater than zero.");
        return;
    }

    currentBalance += userAmount

    let display = document.querySelector(".mainBalance");
    display.innerText = "Rs." + currentBalance.toLocaleString();
    alert("Success! Your amount has been deposited.");
}

function withdrawMoney() {
    let userInput = prompt("Enter amount to withdraw:");

    if (userInput === null) {
        return;
    }

    let widthdrawAmount = Number(userInput);

    if (isNaN(widthdrawAmount)) {
        alert("Invalid input! Please enter a valid number.");
        return;
    }

    else if (widthdrawAmount <= 0) {
        alert("Transaction failed! Please enter an amount greater than zero.");
        return;
    }

    else if (widthdrawAmount > currentBalance) {
        alert("Insufficient Balance");
    }

    else {
        currentBalance -= widthdrawAmount
        let display = document.querySelector(".mainBalance");
        display.innerText = "Rs." + currentBalance.toLocaleString();
        alert("Success! Cash withdrawn.");
    }

}
function transferMoney() {
    let accNum = prompt("Enter 11-digit Account Number:");
    if (accNum === null) {
        return;
    }

    let userTransferMoney = (accNum);
    if (userTransferMoney.length !== 11 || isNaN(accNum)) {
        alert("Incorrect Number! Please enter exactly 11 digits.");
        return;
    }

    let amountInput = prompt("Enter amount to transfer:");
    if (amountInput === null) return;


    let transferAmount = Number(amountInput)

    if (isNaN(transferAmount)) {
        alert("Error: Please enter a valid number!");
    }

    else if (transferAmount <= 0) {
        alert("Error: Amount must be more than 0!");
    }

    else if (transferAmount > currentBalance) {
        alert("Insufficient Balance!");
    }

    else {
        let success = confirm("Are you sure you want to transfer Rs." + transferAmount + " to " + accNum + "?");
        if (success === null)
            return;

        if (success === true) {
            currentBalance -= transferAmount
            let display = document.querySelector(".mainBalance")
            display.innerText = "Rs." + currentBalance.toLocaleString();
            alert("Transfer SucessFully");
        }
    }
}


function toggleGeneric(inputId, iconElement) {
    const input = document.getElementById(inputId);
    
    if (input.type === "password") {
        input.type = "text";
        iconElement.classList.replace("fa-eye", "fa-eye-slash");
        // Orange neon agar Change PIN box mein ho, warna green
        iconElement.style.color = inputId.includes('pin-input') ? "var(--neon-green)" : "var(--neon-orange)";
    } else {
        input.type = "password";
        iconElement.classList.replace("fa-eye-slash", "fa-eye");
        iconElement.style.color = "var(--text-secondary)";
    }
}