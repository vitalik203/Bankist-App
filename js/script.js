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

    const dataBorrow = new Date();
    let transactionsObj = localStorage.getItem(current__index);
    transactionsObj = JSON.parse(transactionsArr);
    transactionsArr = transactionsObj.transactions;
    transactionsArr.push(
      `${dataBorrow.getHours()}:${dataBorrow.getMinutes()}:${dataBorrow.getSeconds()}, ${dataBorrow.getDate()}.${
        dataBorrow.getMonth() + 1
      }.${dataBorrow.getFullYear()}`,
      valueFromInputBorrow
    );
    transactionsObj.transactions = transactionsArr;
    let modifiedTransaction = JSON.stringify(transactionsArr);
    localStorage.setItem(current__index, modifiedTransaction); //туть

    // let tranzactionElement = document.createElement("div");
    // tranzactionElement.innerHTML = `<div>
    // data of tranzaction: ${dataBorrow.getHours()}:${dataBorrow.getMinutes()}:${dataBorrow.getSeconds()}, ${dataBorrow.getDate()}.${
    //   dataBorrow.getMonth() + 1
    // }.${dataBorrow.getFullYear()} <br>
    // borrow amount: $${valueFromInputBorrow}
    // </div>
    // `;
    // tranzactionBox.appendChild(tranzactionElement);

    document.querySelector(
      ".current__balance"
    ).innerHTML = `<h2>Current balance: $${balancee.balance}</h2>`;
    let modifiedBalance = JSON.stringify(balancee);
    localStorage.setItem(current__index, modifiedBalance);
  });

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
      setTimeout(() => {
        document.querySelector(".sighUp-block").classList.add("hidden");
        document.querySelector(".signIn-block").classList.add("hidden");
        btnReg.classList.add("hidden");
        btnLog.classList.add("hidden");
        btnLogOut.classList.remove("hidden");
        afterlogin__block.classList.remove("hidden");
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
