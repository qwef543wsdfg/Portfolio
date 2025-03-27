// script.js

document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.querySelector("#expenseForm");
    const expenseName = document.querySelector("#expenseName");
    const expenseAmount = document.querySelector("#expenseAmount");
    const expenseCategory = document.querySelector("#expenseCategory");
    const expenseList = document.querySelector("#expenseList");
    const totalAmount = document.querySelector("#totalAmount");
    const categoryFilter = document.querySelector("#categoryFilter");
    const chartCanvas = document.querySelector("#expenseChart");
    
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = 0;
    let chart;
    
    function renderExpenses(filter = "All") {
        expenseList.innerHTML = "";
        total = 0;
        
        expenses.filter(exp => filter === "All" || exp.category === filter).forEach(exp => {
            addExpenseToDOM(exp);
            total += exp.amount;
        });
        updateTotal();
        updateChart();
    }
    
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value.trim());
        const category = expenseCategory.value;
        
        if (name === "" || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid expense name and amount.");
            return;
        }
        
        const newExpense = { name, amount, category };
        expenses.push(newExpense);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        
        addExpenseToDOM(newExpense);
        total += amount;
        updateTotal();
        updateChart();
        
        expenseName.value = "";
        expenseAmount.value = "";
    });
    
    function addExpenseToDOM(exp) {
        const li = document.createElement("li");
        li.classList.add("expense-item");
        li.innerHTML = `${exp.name} - ₹${exp.amount.toFixed(2)} (${exp.category}) <button class='delete-btn'>X</button>`;
        
        li.querySelector(".delete-btn").addEventListener("click", () => {
            expenses = expenses.filter(e => e !== exp);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            li.classList.add("fadeOut");
            setTimeout(() => {
                li.remove();
                renderExpenses(categoryFilter.value);
            }, 500);
        });
        
        expenseList.appendChild(li);
    }
    
    function updateTotal() {
        totalAmount.textContent = `Total: ₹${total.toFixed(2)}`;
    }
    
    categoryFilter.addEventListener("change", (e) => {
        renderExpenses(e.target.value);
    });
    
    function updateChart() {
        const categoryData = {};
        
        expenses.forEach(exp => {
            categoryData[exp.category] = (categoryData[exp.category] || 0) + exp.amount;
        });
        
        const labels = Object.keys(categoryData);
        const data = Object.values(categoryData);
        
        if (chart) chart.destroy();
        
        chart = new Chart(chartCanvas, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                }]
            }
        });
    }
    
    renderExpenses();
});

