let btn = document.querySelector("#addInput");
let table = document.getElementById("tran-table");

btn.addEventListener("click", () => {
    addTransaction();
    saveData();
});

function addTransaction() {
    let amount = parseFloat(document.getElementsByClassName("enter-amount")[0].value);
    let transactionType = document.getElementsByClassName("dropdown")[0].value;
    let date = document.getElementsByClassName("dateInput")[0].value;

    let totalIncome = document.getElementById("totalCredits");
    let totalExpense = document.getElementById("totalDebits");
    let balance = document.getElementById("totalBalance");

    // Input validation
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    if (!transactionType || transactionType === "Transaction type") {
        alert("Please select a transaction type.");
        return;
    }
    if (date === "") {
        alert("Please enter a valid date.");
        return;
    }

    let row = document.createElement("tr");

    let amountInput = document.createElement("td");
    amountInput.innerText = amount;

    let transactionInput = document.createElement("td");
    transactionInput.innerText = transactionType;

    let dateText = document.createElement("td");
    dateText.innerText = date;

    let bin = document.createElement("td");
    let deleteButton = document.createElement("button");
    let binImage = document.createElement("img");
    binImage.src = "./delete.png";
    binImage.style.width = "30px";
    binImage.style.height = "30px";
    deleteButton.classList.add("delete");
    deleteButton.appendChild(binImage);

    deleteButton.addEventListener("click", () => {
        row.remove();
        updateTotals();  // Recalculate totals after deletion
        saveData();
    });

    bin.appendChild(deleteButton);

    row.appendChild(amountInput);
    row.appendChild(transactionInput);
    row.appendChild(dateText);
    row.appendChild(bin);
    table.appendChild(row);

    updateTotals();
    saveData();
}

// Function to recalculate totals dynamically
function updateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;

    document.querySelectorAll("#tran-table tr").forEach(row => {
        let amount = parseFloat(row.children[0].innerText);
        let type = row.children[1].innerText;

        if (type === "credit") {
            totalIncome += amount;
        } else if (type === "debit") {
            totalExpense += amount;
        }
    });

    let balance = totalIncome - totalExpense;

    document.getElementById("totalCredits").innerText = totalIncome;
    document.getElementById("totalDebits").innerText = totalExpense;
    document.getElementById("totalBalance").innerText = balance;
}

function saveData() {
    localStorage.setItem("transactions", table.innerHTML);
    localStorage.setItem("totalIncome", document.getElementById("totalCredits").innerText);
    localStorage.setItem("totalExpense", document.getElementById("totalDebits").innerText);
    localStorage.setItem("balance", document.getElementById("totalBalance").innerText);
}

function loadData() {
    let savedTransactions = localStorage.getItem("transactions");
    let savedIncome = localStorage.getItem("totalIncome");
    let savedExpense = localStorage.getItem("totalExpense");
    let savedBalance = localStorage.getItem("balance");

    if (savedTransactions) table.innerHTML = savedTransactions;
    if (savedIncome) document.getElementById("totalCredits").innerText = savedIncome;
    if (savedExpense) document.getElementById("totalDebits").innerText = savedExpense;
    if (savedBalance) document.getElementById("totalBalance").innerText = savedBalance;

   
    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", (event) => {
            event.target.closest("tr").remove();
            updateTotals();
            saveData();
        });
    });

    updateTotals(); 
}


 loadData();
