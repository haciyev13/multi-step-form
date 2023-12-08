let form = document.querySelector(".section__form-info-1");
let allSteps = document.querySelectorAll(".section__form-info");
let allStepsBtns = document.querySelectorAll(".section__form-img-card-circle");
let isValid = false;

// ! Step two
let allPlans = document.querySelectorAll(".section__form-card-item");
let stepTwoNextBtn = document.querySelector(".nextBtn-2");
let stepTwoBackBtn = document.querySelector(".backBtn-2");

let selectedDatas = {};

let isYearPlan = false;

// ! step 3
let allPickAddOns = document.querySelectorAll(".section__checkbox");
let allAddsCheckBoxes = document.querySelectorAll(
     ".section__checkbox .checkbox-input input"
);

let stepThreeNextBtn = document.querySelector(".nextBtn-3");
let stepThreeBackBtn = document.querySelector(".backBtn-3");
form.addEventListener("submit", stepOneForm);

function stepOneForm(e) {
     e.preventDefault();
     //   !Inputs
     let nameInput = form.querySelector(".name");
     let emailInput = form.querySelector(".email");
     let phoneInput = form.querySelector(".phone");

     //   !Regular expressions
     const nameInputRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
     const emailInputRegex =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     const phoneInputRegex =
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;

     //   !Error massages
     let nameError = document.querySelector(".name-label .error-message");
     let emailError = document.querySelector(".email-label .error-message");
     let phoneError = document.querySelector(".phone-label .error-message");

     if (nameInputRegex.test(nameInput.value)) {
          nameError.textContent = "";
          isValid = true;
     } else {
          nameError.textContent = "Your name is not valid";
          isValid = false;
     }

     if (emailInputRegex.test(emailInput.value)) {
          emailError.textContent = "";
          isValid = true;
     } else {
          emailError.textContent = "Your email is not valid";
          isValid = false;
     }

     if (phoneInputRegex.test(phoneInput.value)) {
          phoneError.textContent = "";
          isValid = true;
     } else {
          phoneError.textContent = "Your phone format is not valid";
          isValid = false;
     }

     if (isValid) {
          form.classList.add("d-none");
          allSteps[1].classList.remove("d-none");
          allStepsBtns[1].classList.add("click");
     }
}

// ! Step two

allPlans.forEach((plan) => {
     plan.addEventListener("click", function () {
          allPlans.forEach((item) => item.classList.remove("selected"));
          plan.classList.add("selected");
     });
});

stepTwoNextBtn.addEventListener("click", stepTwoFunction);
stepTwoBackBtn.addEventListener("click", function (e) {
     e.preventDefault();
     allSteps[1].classList.add("d-none");
     allSteps[0].classList.remove("d-none");
     allStepsBtns[1].classList.remove("click");
});

function stepTwoFunction(e) {
     selectPlan();
     e.preventDefault();
     allSteps[1].classList.add("d-none");
     allSteps[2].classList.remove("d-none");
     allStepsBtns[2].classList.add("click");
}

function selectPlan() {
     let selectedPlan = document.querySelector(
          ".section__form-card-item.selected"
     );
     let selectedPlanTitle =
          selectedPlan.lastElementChild.firstElementChild.textContent;
     let selectedPlanPrice =
          selectedPlan.lastElementChild.lastElementChild.textContent;

     let toggleBtn = document.querySelector(".switch input");
     let allPlanPrices = document.querySelectorAll(".plan-price");
     let planMonthly = document.querySelector(".plan-monthly");
     let planYearly = document.querySelector(".plan-yearly");

     toggleBtn.addEventListener("click", function () {
          if (toggleBtn.checked) {
               planYearly.style.color = "var(--Denim, #022959)";
               planMonthly.style.color = "var(--Grey, #9699aa)";
               allPlanPrices[0].textContent = "$90/yr";
               allPlanPrices[1].textContent = "$120/yr";
               allPlanPrices[2].textContent = "$150/yr";
               isYearPlan = true;
          } else {
               planMonthly.style.color = "var(--Denim, #022959)";
               planYearly.style.color = "var(--Grey, #9699aa)";
               allPlanPrices[0].textContent = "$9/mo";
               allPlanPrices[1].textContent = "$12/mo";
               allPlanPrices[2].textContent = "$15/mo";
               isYearPlan = false;
          }
     });

     selectedDatas.title = selectedPlanTitle;
     selectedDatas.price = selectedPlanPrice;
     detectIsYearPlar(isYearPlan);
}

selectPlan();

// ! Step three

allAddsCheckBoxes.forEach((checkbox) => {
     checkbox.addEventListener("click", function () {
          if (checkbox.checked) {
               checkbox.parentElement.parentElement.style.backgroundColor =
                    "var(--very-light-grey)";
               checkbox.parentElement.parentElement.classList.add("selected");
          } else {
               checkbox.parentElement.parentElement.style.backgroundColor = "#fff";
               checkbox.parentElement.parentElement.classList.remove("selected");
          }
     });
});

function detectIsYearPlar(plan) {
     if (!plan) {
          allPickAddOns[0].children[2].firstElementChild.textContent = "+$1/mo";
          allPickAddOns[1].children[2].firstElementChild.textContent = "+$3/mo";
          allPickAddOns[2].children[2].firstElementChild.textContent = "+$5/mo";
     } else {
          allPickAddOns[0].children[2].firstElementChild.textContent = "+$10/yr";
          allPickAddOns[1].children[2].firstElementChild.textContent = "+$30/yr";
          allPickAddOns[2].children[2].firstElementChild.textContent = "+$50/yr";
     }
}

stepThreeNextBtn.addEventListener("click", stepThreeFunction);
stepThreeBackBtn.addEventListener("click", function (e) {
     e.preventDefault();
     allSteps[2].classList.add("d-none");
     allSteps[1].classList.remove("d-none");
     allStepsBtns[2].classList.remove("click");
});

function stepThreeFunction(e) {
     selectAddOns();
     e.preventDefault();
     allSteps[2].classList.add("d-none");
     allSteps[3].classList.remove("d-none");
     allStepsBtns[3].classList.add("click");

     stepFourFunction(selectedDatas);
}

function selectAddOns() {
     selectedDatas.addOns = [];

     let allSelectedAddOns = document.querySelectorAll(
          ".section__checkbox.selected"
     );

     allSelectedAddOns?.forEach((selectedAdd) => {
          let addOnsTitle = selectedAdd.children[1].firstElementChild.textContent;
          let addOnsPrice = selectedAdd.children[2].firstElementChild.textContent;

          selectedDatas.addOns.push({
               addOnsTitle,
               addOnsPrice,
          });
     });
}

//! Step 4
let submitBtn = document.querySelector(".nextBtn-4");
// let sec4 = document.querySelector(".section__form-info-4")
let arcadeTitle = document.querySelector(".arcade__montly .title");
let arcadePrice = document.querySelector(".arcade__montly .price");
let service = document.querySelector(".service");
let total = document.querySelector(".total p:nth-child(2)");

let stepFourBackBtn = document.querySelector(".backBtn-4");
function stepFourFunction(data) {
     service.innerHTML = "";

     let totalPrice = 0;
     arcadeTitle.textContent = data.title;
     arcadePrice.textContent = data.price;
     totalPrice += Number(data.price.split("/")[0].substring(1));
     data.addOns.forEach((adds) => {
          totalPrice += Number(adds.addOnsPrice.split("/")[0].substring(2));
          service.innerHTML += `
       <div class="service-top">
       <p class="service-top-1">${adds.addOnsTitle}</p>
       <p class="service-top-2">${adds.addOnsPrice}</p>
       </div>
       `;
     });
     if (isYearPlan) {
          total.innerHTML = `$${totalPrice}/yr`;
     } else {
          total.innerHTML = `$${totalPrice}/mo`;
     }

     console.log(data);
}

stepFourBackBtn.addEventListener("click", function (e) {
     e.preventDefault();
     allSteps[3].classList.add("d-none");
     allSteps[2].classList.remove("d-none");
     allStepsBtns[3].classList.remove("click");
});

// stepFourFunction(selectedDatas);
