"use strict";

//===========Production calculator functionality===================================
const itemNumber              = document.querySelectorAll(".steps__table__body__counter"),
      itemContainer           = document.querySelectorAll(".steps__table__body__buttons"),
      itemPrice               = document.querySelectorAll(".steps__table__body__cell-count"),
      itemResult              = document.querySelectorAll(".steps__table__body__cell-total"),
      blockDelete             = document.querySelectorAll(".steps__table__body__row td:last-child"),
      footerRows              = document.querySelectorAll(".steps__table__footer__row"),
      bodyRows                = document.querySelectorAll(".steps__table__body__row");

let   totalSum                = document.querySelector(".steps__total__count"),
      paymentMethods          = document.querySelectorAll(".steps__img-payment"),
      deliveryMethods         = document.querySelectorAll(".steps__img-delivery"),
      deliverySum             = 500,
      deliveryIndex           = 0;

//===========================Plus and Minus clicks==============================
itemContainer.forEach((item, i) => {
  item.addEventListener("click", evt => {
    if(itemNumber[i].value > 0 && evt.target.classList.contains("fa-minus")) {
      itemNumber[i].value--;
    } else if(itemNumber[i].value < 99 && evt.target.classList.contains("fa-plus")) {
      itemNumber[i].value++;
    }
    itemResult[i].textContent = parseInt(itemPrice[i].textContent, 10) * itemNumber[i].value;
    writeResults();
  });
});

//=========================Counting process=====================================
itemNumber.forEach((item, i) =>{
  item.addEventListener("input", evt => {
    if(isNaN(+evt.target.value) || +evt.target.value < 0) {
      evt.target.value = 1;
    }
    itemResult[i].textContent = parseInt(itemPrice[i].textContent, 10) * evt.target.value;
    writeResults();
  });
});

//==================Delivery choice operations==================================
deliveryMethods.forEach( (item, i) => {
  item.addEventListener("click", evt => {
    for(let j = 0; j < deliveryMethods.length; j++) {
      deliveryMethods[j].classList.remove("red");
      footerRows[j].classList.add("hidden");
    }
    evt.target.closest("div").classList.add("red");
    deliveryIndex = i;
    deliverySum = deliverySumCount(deliveryIndex);
    footerRows[deliveryIndex].classList.remove("hidden");
    writeResults();
  });
});

//====================Payment methods operations================================
paymentMethods.forEach( (item, i) => {
  item.addEventListener("click", evt => {
    for(let j = 0; j < paymentMethods.length; j++) {
      paymentMethods[j].classList.remove("red");
    }
    evt.target.closest("div").classList.add("red");
  });
});

//================DELETE Button functionality===================================
blockDelete.forEach((item) => {
  item.addEventListener("click", evt => {
    if(evt.target.alt === "delete") {
      evt.target.parentNode.parentNode.children[3].children[0].children[1].children[0].value = 0;
      evt.target.parentNode.parentNode.classList.add("hidden");
    }
    writeResults();
    let check = [].some.call(bodyRows, isVisible);
    if(!check) {
      document.querySelector(".steps__item-4").classList.add("hidden");
    }
  });
});

//===============Function writeResults =========================================
function writeResults() {
  let sum           = 0,
      quantity      = 0;
  itemResult.forEach((item, i) => {
    item.textContent = itemPrice[i].textContent * itemNumber[i].value;
  });
  for (let index = 0; index < itemContainer.length; index++) {
    sum += +itemResult[index].textContent;
    quantity += +itemNumber[index].value;
  }
  if(quantity === 0) {
    totalSum.textContent = 0;
    footerRows.forEach(item => {
      item.classList.add("hidden");
    });
  } else {
    footerRows[deliveryIndex].classList.remove("hidden");
    totalSum.textContent = sum + deliverySum;
  }
}

function deliverySumCount(index) {
  let sum;
  isNaN(index) ? sum = 0 : index === 0 ? sum = 500 : index === 1 ? sum = 0 : index === 2 ? sum = 500 : sum = 1000;
  return sum;
}

function isVisible(elem) {
  return !elem.classList.contains("hidden");
}
