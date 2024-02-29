const peoples = [];
let peopleIndex;

const btnReg = document.querySelector(".btn__reg");
const btnLog = document.querySelector(".btn__log");
const submitReg = document.querySelector(".btn__reg-submit");
const submitLog = document.querySelector(".btn__log-submit");

btnReg.addEventListener("click", function () {
  document.querySelector(".sighUp-block").classList.remove("hidden");
});

submitReg.addEventListener("click", function () {
  if (
    document.querySelector(".password__input").value ===
    document.querySelector(".repeatPassword__input").value
  ) {
    peoples.push({
      login: document.querySelector(".login__input").value,
      password: document.querySelector(".password__input").value,
    });
    console.log(peoples);
    document.querySelector(".login__input").value = "";
    document.querySelector(".password__input").value = "";
    document.querySelector(".repeatPassword__input").value = "";
    document.querySelector(".password__input").style.border = "1px solid black";
    document.querySelector(".password__input").style.borderRadius = "2px";
    document.querySelector(".repeatPassword__input").style.border =
      "1px solid black";
    document.querySelector(".repeatPassword__input").style.borderRadius = "2px";
    document.querySelector(".sighUp-block").classList.add("hidden");
    document.querySelector(".signIn-block").classList.remove("hidden");
  } else {
    document.querySelector(".password__input").style.border = "1px solid red";
    document.querySelector(".repeatPassword__input").style.border =
      "1px solid red";
  }
  console.log(peoples);
});

btnLog.addEventListener("click", function () {
  document.querySelector(".signIn-block").classList.remove("hidden");
});

submitLog.addEventListener("click", function () {
  for (let i = 0; i < peoples.length; i++) {
    if (
      peoples[i].login ===
        document.querySelector(".login__input").textContent &&
      peoples[i].password ===
        document.querySelector(".password__input").textContent
    ) {
      console.log("Login Successful!!!");
    } else {
      console.error("Invalid Login! Repeat!");
    }
  }
});
