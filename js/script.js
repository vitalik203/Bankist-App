document.addEventListener("DOMContentLoaded", (e) => {
  "use strict";
  const peoples = [];
  const btnReg = document.querySelector(".btn__reg");
  const btnLog = document.querySelector(".btn__log");
  const btnLogOut = document.querySelector(".btn__logOut");
  const submitReg = document.querySelector(".btn__reg-submit");
  const submitLog = document.querySelector(".btn__log-submit");
  const afterlogin__block = document.querySelector(".afterlogin__block");
  const borrowBox = document.querySelector(".borrow__box");
  let currentBalance = 0;
  const borrowBtn = document.querySelector(".borrow__money");
  const tranzactionBox = document.querySelector(".transaction__box");
  let displayedBalance;
  let regOperatingData = {};
  let login, pass;
  let current__index;
  borrowBox.classList.add("hidden");
  btnReg.addEventListener("click", function () {
    document.querySelector(".sighUp-block").classList.remove("hidden");
    document.querySelector(".signIn-block").classList.add("hidden");
    document.querySelector(".loginReg__input").value = "";
    document.querySelector(".passwordReg__input").value = "";
    document.querySelector(".repeatPasswordReg__input").value = "";
  });
  submitReg.addEventListener("click", function () {
    if (
      document.querySelector(".passwordReg__input").value ===
      document.querySelector(".repeatPasswordReg__input").value
    ) {
      peoples.push({
        login: document.querySelector(".loginReg__input").value,
        password: document.querySelector(".passwordReg__input").value,
      });
      regOperatingData = {
        login: document.querySelector(".loginReg__input").value,
        password: document.querySelector(".passwordReg__input").value,
        balance: 0,
        transactions: [],
      };
      localStorage.setItem(
        document.querySelector(".loginReg__input").value,
        JSON.stringify(regOperatingData)
      );
      document.querySelector(".loginLog__input").value = "";
      document.querySelector(".passwordReg__input").value = "";
      document.querySelector(".repeatPasswordReg__input").value = "";
      document.querySelector(".passwordReg__input").style.border =
        "1px solid black";
      document.querySelector(".passwordReg__input").style.borderRadius = "2px";
      document.querySelector(".repeatPasswordReg__input").style.border =
        "1px solid black";
      document.querySelector(".repeatPasswordReg__input").style.borderRadius =
        "2px";
      document.querySelector(".sighUp-block").classList.add("hidden");
      document.querySelector(".signIn-block").classList.remove("hidden");
    } else {
      document.querySelector(".passwordReg__input").style.border =
        "1px solid red";
      document.querySelector(".repeatPasswordReg__input").style.border =
        "1px solid red";
    }
    document.querySelector(".loginLog__input").value = "";
    document.querySelector(".passwordLog__input").value = "";
  });

  btnLog.addEventListener("click", function () {
    document.querySelector(".signIn-block").classList.remove("hidden");
    document.querySelector(".sighUp-block").classList.add("hidden");
    document.querySelector(".loginLog__input").value = "";
    document.querySelector(".passwordLog__input").value = "";
  });

  borrowBtn.addEventListener("click", function () {
    if (document.querySelector(".borrow__money-input").value === "") {
      alert("Введіть суму більше за 0");
    } else {
      // Тут про баланс
      currentBalance = localStorage.getItem(current__index.balance);
      let valueFromInputBorrow = document.querySelector(
        ".borrow__money-input"
      ).value;
      valueFromInputBorrow = Number(valueFromInputBorrow);
      currentBalance += valueFromInputBorrow;
      console.log(currentBalance);
      let balancee = localStorage.getItem(current__index);
      balancee = JSON.parse(balancee);
      balancee.balance += currentBalance;

      document.querySelector(
        ".current__balance"
      ).innerHTML = `<h2>Current balance: $${balancee.balance}</h2>`;
      let modifiedBalance = JSON.stringify(balancee);
      localStorage.setItem(current__index, modifiedBalance);

      // Тут про транзакції
      console.log(current__index);
      const dataBorrow = new Date();
      let contentOfTransaction = `Time of transaction: ${
        dataBorrow.getHours() < 10
          ? "0" + dataBorrow.getHours()
          : dataBorrow.getHours()
      }:${
        dataBorrow.getMinutes() < 10
          ? "0" + dataBorrow.getMinutes()
          : dataBorrow.getMinutes()
      }:${
        dataBorrow.getSeconds() < 10
          ? "0" + dataBorrow.getSeconds()
          : dataBorrow.getSeconds()
      }  ${
        dataBorrow.getDate() < 10
          ? "0" + dataBorrow.getDate()
          : dataBorrow.getDate()
      }.${
        dataBorrow.getMonth() + 1 < 10
          ? "0" + (dataBorrow.getMonth() + 1)
          : dataBorrow.getMonth() + 1
      }.${dataBorrow.getFullYear()} <br> Amount: $${valueFromInputBorrow}`;
      let currentLoginn = localStorage.getItem("current-login");

      let transactionsArr = JSON.parse(localStorage.getItem(currentLoginn));
      transactionsArr.transactions.push(contentOfTransaction);
      localStorage.setItem(currentLoginn, JSON.stringify(transactionsArr));
      let transactionsData = JSON.parse(localStorage.getItem(currentLoginn));
      let newElementOfTransactions = "";
      for (let i = 0; i < transactionsData.transactions.length; i++) {
        newElementOfTransactions += `<div>${transactionsData.transactions[i]}</div>`;
      }
      tranzactionBox.innerHTML = newElementOfTransactions;
    }
  }); // Додайте закриваючу круглу дужку тут

  submitLog.addEventListener("click", function () {
    let logged = false;
    let info = document.querySelector(".loginLog__input").value;
    login = localStorage.getItem(info);
    login = JSON.parse(login);
    login = login.login;
    pass = localStorage.getItem(info);
    pass = JSON.parse(pass);
    pass = pass.password;
    if (
      document.querySelector(".loginLog__input").value === login &&
      document.querySelector(".passwordLog__input").value === pass
    ) {
      logged = true;
    }
    if (logged) {
      let currentUser = {
        currentLogin: "0",
      };
      localStorage.setItem("1", JSON.stringify(currentUser));
      setTimeout(() => {
        document.querySelector(".sighUp-block").classList.add("hidden");
        document.querySelector(".signIn-block").classList.add("hidden");
        btnReg.classList.add("hidden");
        btnLog.classList.add("hidden");
        btnLogOut.classList.remove("hidden");
        afterlogin__block.classList.remove("hidden");
        document.querySelector(".send__money").classList.remove("hidden");
        document.querySelector(
          ".main__name"
        ).innerHTML = `<h1>Hello, dear ${login}!!!</h1>`;
        current__index = login;
        borrowBox.classList.remove("hidden");
        displayedBalance = localStorage.getItem(login);
        displayedBalance = JSON.parse(displayedBalance);
        document.querySelector(
          ".current__balance"
        ).innerHTML = `<h2>Current balance: $${displayedBalance.balance}</h2>`;
        console.log(login.balance);
        document.querySelector(".borrow__money-input").textContent = "";
        localStorage.setItem("current-login", JSON.stringify(login));
        let current_login = localStorage.getItem("current-login");
        if (current_login !== login) {
          current_login = login;
          localStorage.setItem("current-login", current_login);
        }
        let transactionsData = JSON.parse(localStorage.getItem(current_login));
        let newElementOfTransactions = "";
        for (let i = 0; i < transactionsData.transactions.length; i++) {
          newElementOfTransactions += `<div>${transactionsData.transactions[i]}</div>`;
        }
        tranzactionBox.innerHTML = newElementOfTransactions;
      }, 2000);
    }
  });

  btnLogOut.addEventListener("click", function () {
    afterlogin__block.classList.add("hidden");
    btnReg.classList.remove("hidden");
    btnLog.classList.remove("hidden");
    btnLogOut.classList.add("hidden");
    borrowBox.classList.add("hidden");
  });
});

document
  .querySelector(".send__money-btn")
  .addEventListener("click", function () {
    let nameSendInput = document.querySelector(".name-input").value;
    let sendMoneyInputValue = Number(
      document.querySelector(".send__money-input").value
    );
    let userObject = JSON.parse(localStorage.getItem(nameSendInput));
    const dataBorrow = new Date();
    let current_login = localStorage.getItem("current-login");
    if (userObject !== null) {
      let contentOfTransaction = `Time of transaction: ${
        dataBorrow.getHours() < 10
          ? "0" + dataBorrow.getHours()
          : dataBorrow.getHours()
      }:${
        dataBorrow.getMinutes() < 10
          ? "0" + dataBorrow.getMinutes()
          : dataBorrow.getMinutes()
      }:${
        dataBorrow.getSeconds() < 10
          ? "0" + dataBorrow.getSeconds()
          : dataBorrow.getSeconds()
      }  ${
        dataBorrow.getDate() < 10
          ? "0" + dataBorrow.getDate()
          : dataBorrow.getDate()
      }.${
        dataBorrow.getMonth() + 1 < 10
          ? "0" + (dataBorrow.getMonth() + 1)
          : dataBorrow.getMonth() + 1
      }.${dataBorrow.getFullYear()} <br> Inbox amount: $${sendMoneyInputValue} from ${current_login}`;
      userObject.balance += sendMoneyInputValue;
      userObject.transactions.push(contentOfTransaction);
      localStorage.setItem(nameSendInput, JSON.stringify(userObject));
      document.querySelector(".name-input").textContent = "";
      document.querySelector(".send__money-input").textContent = "";
    }
    contentOfTransaction = `Time of transaction: ${
      dataBorrow.getHours() < 10
        ? "0" + dataBorrow.getHours()
        : dataBorrow.getHours()
    }:${
      dataBorrow.getMinutes() < 10
        ? "0" + dataBorrow.getMinutes()
        : dataBorrow.getMinutes()
    }:${
      dataBorrow.getSeconds() < 10
        ? "0" + dataBorrow.getSeconds()
        : dataBorrow.getSeconds()
    }  ${
      dataBorrow.getDate() < 10
        ? "0" + dataBorrow.getDate()
        : dataBorrow.getDate()
    }.${
      dataBorrow.getMonth() + 1 < 10
        ? "0" + (dataBorrow.getMonth() + 1)
        : dataBorrow.getMonth() + 1
    }.${dataBorrow.getFullYear()} <br> Amount to somebody: -$${sendMoneyInputValue} to ${nameSendInput}`;
    transactionsArr = JSON.parse(localStorage.getItem(current_login));
    transactionsArr.balance -= sendMoneyInputValue;
    localStorage.setItem(current_login, JSON.stringify(transactionsArr));
    displayedBalance = localStorage.getItem(current_login);
    displayedBalance = JSON.parse(displayedBalance);
    document.querySelector(
      ".current__balance"
    ).innerHTML = `<h2>Current balance: $${displayedBalance.balance}</h2>`;
    transactionsArr.transactions.push(contentOfTransaction);
    localStorage.setItem(current_login, JSON.stringify(transactionsArr));
    let transactionsData = JSON.parse(localStorage.getItem(current_login));
    let newElementOfTransactions = "";
    for (let i = 0; i < transactionsData.transactions.length; i++) {
      newElementOfTransactions += `<div>${transactionsData.transactions[i]}</div>`;
    }
    document.querySelector(".transaction__box").innerHTML =
      newElementOfTransactions;
  });
