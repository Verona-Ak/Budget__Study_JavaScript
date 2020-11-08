'use strict';

let start = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],


    expensesItem = document.getElementsByClassName("expenses-item"),


    approve1 = document.getElementsByTagName('button')[0],
    approve2 = document.getElementsByTagName('button')[1],
    calculate = document.getElementsByTagName('button')[2],


    optionalexpensesItem = document.querySelectorAll(".optionalexpenses-item"),

    income = document.querySelector('#income'),
    checkbox = document.querySelector('#savings'),
    sum = document.querySelector('#sum'),
    percent = document.querySelector('#percent'),
    year = document.querySelector('.year .year-value'),
    month = document.querySelector('.month .month-value'),
    day = document.querySelector('.day .day-value');

//неактивноть кнопок
approve1.disabled = true;
approve2.disabled = true;
calculate.disabled = true;
checkbox.disabled = true;

    
let money, time;

start.addEventListener('click', function(e) {
    time = prompt("Введите дату в формате YYYY-MM-DD", "YYYY-MM-DD");
    money = +prompt("Ваш бюджет на месяц?", "");
    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth()+1;
    day.value =  new Date(Date.parse(time)).getDate();

    approve1.disabled = false;
    approve2.disabled = false;
    checkbox.disabled = false;
});

approve1.addEventListener('click', function(e) {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
    
        if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null && 
            a != '' && b != '' && a.length < 50) {
            console.log("done");
            appData.expenses[a] = b;
            sum += +b;
        } else {
            console.log("плохой результат");
            i--;
        }
    }
    expensesValue.textContent = sum;
    calculate.disabled = false;
});

approve2.addEventListener('click', function(e) {
    for (let i = 0; i < optionalexpensesItem.length; i++) {
        let opt = optionalexpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    } 
});

calculate.addEventListener('click', function(e) {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - parseInt(expensesValue.textContent))/30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay <= 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay >= 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        daybudgetValue.textContent = 'Произошла ошибка';
    }

    
});

income.addEventListener('input', function(e) {
    let items = income.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;
});

checkbox.addEventListener('click', function(e) {
    if (appData.savings) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
    
});

sum.addEventListener('input', function(e) {
    if (appData.savings == true) {
        let s = +sum.value,
            p = +percent.value;
        
        appData.monthIncome = s/100/12*p;
        appData.yearIncome = s/100*p;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percent.addEventListener('input', function(e) {
    if (appData.savings == true) {
        let s = +sum.value,
            p = +percent.value;
        
        appData.monthIncome = s/100/12*p;
        appData.yearIncome = s/100*p;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},              //обязательные расходы
    optionalExpenses: {},      //необязательные расходы
    income: [],                //доп. расходы
    savings: false,

};


