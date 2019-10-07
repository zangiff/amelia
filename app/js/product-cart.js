"use strict";

//===========Production calculator functionality===================================
const itemNumber              = document.querySelectorAll(".tabs__content__counter"),
      itemContainer           = document.querySelectorAll(".tabs__content__buttons"),
      itemPrice               = document.querySelectorAll(".tabs__content__price>span"),
      itemResult              = document.querySelectorAll(".tabs__content__result"),
      blockDelete             = document.querySelectorAll(".tabs__content__delete");

let   totalQuantity           = document.querySelector("#total-quantity"),
      totalSum                = document.querySelector("#total-sum"),
      totalDiscount           = document.querySelector("#total-discount"),
      grammarChanges          = document.querySelector("#grammar-changes");

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

itemNumber.forEach((item, i) =>{
  item.addEventListener("input", evt => {
    if(isNaN(+evt.target.value) || +evt.target.value < 0) {
      evt.target.value = 1;
    }
    itemResult[i].textContent = parseInt(itemPrice[i].textContent, 10) * evt.target.value;
    writeResults();
  });
});

//================DELETE Button functionality===================================
blockDelete.forEach((item) => {
  item.addEventListener("click", evt => {
    if(evt.target.alt === "delete") {
      evt.target.parentNode.parentNode.children[4].children[1].children[0].value = 0;
      writeResults();
      evt.target.parentNode.parentNode.style.display = "none";
    }
  })
})

//===============Function writeResults =========================================
function writeResults() {
  let sum = 0;
  let quantity = 0;
  itemResult.forEach((item, i) => {
    item.textContent = itemPrice[i].textContent * itemNumber[i].value;
  });
  for (let index = 0; index < itemContainer.length; index++) {
    sum += +itemResult[index].textContent;
    quantity += +itemNumber[index].value;
  }
  let discount = Math.ceil(sum * 0.05);
  totalSum.textContent = sum;
  totalQuantity.textContent = quantity;
  totalDiscount.textContent = discount;
  let quantityString = quantity.toString();
  if(quantityString.endsWith("1") && !quantityString.endsWith("11") ) {
    grammarChanges.textContent = " товар на ";
  } else if(quantityString.endsWith("5") ||
            quantityString.endsWith("6") ||
            quantityString.endsWith("7") ||
            quantityString.endsWith("8") ||
            quantityString.endsWith("9") ||
            quantityString.endsWith("0")) {
    grammarChanges.textContent = " товаров на ";
  } else if(quantityString.endsWith("11") ||
            quantityString.endsWith("12") ||
            quantityString.endsWith("13") ||
            quantityString.endsWith("14")) {
    grammarChanges.textContent = " товаров на ";
  } else {
    grammarChanges.textContent = " товара на ";
  }
}
