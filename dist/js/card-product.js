"use strict";

//==============Captcha functionality===========================================
const   captchaPicsWrap               = document.querySelector(".feedback__form__captcha-pics"),
        captchaInput                  = document.querySelector("#feedback-captcha"),
        captchaButton                 = document.querySelector(".feedback__form__button"),
        prefix                        = "img/card-product/",
        suffix                        = ".gif";
let     randomNumbers                 = randomArrGenerator(4);

document.addEventListener("DOMContentLoaded", () => {
  randomNumbers.forEach(item => {
    let img = document.createElement("img");
    img.src = prefix + item + suffix;
    captchaPicsWrap.appendChild(img);
  });
});


captchaInput.addEventListener("blur", () => {
  let existNode = captchaInput.parentNode.children[2];
  if(existNode) {
    existNode.parentNode.removeChild(existNode);
  }
  if(captchaInput.value == randomNumbers.join("")) {
    let inputSuccessText = document.createElement("p");
    inputSuccessText.textContent = "Проверка пройдена";
    inputSuccessText.style.color = "green";
    captchaInput.parentNode.appendChild(inputSuccessText);
    captchaButton.removeAttribute("disabled");
  } else {
    let inputWarningText = document.createElement("p");
    inputWarningText.textContent = "Введите код с изображения корректно";
    inputWarningText.style.color = "red";
    captchaInput.parentNode.appendChild(inputWarningText);
    captchaButton.setAttribute("disabled", "disabled");
  }
});

function randomArrGenerator(quantity) {
  let arr = [];
  for (let i = 0; i < quantity; i++) {
    let a = Math.floor(Math.random() * 10);
    arr.push(a);
  }
  return arr;
};

//============Close enter & registration form by mouse click====================
const enterWindow             = document.querySelector(".enter"),
      enterHandler            = document.querySelector(".enter__close");

enterHandler.addEventListener("click", () => {
  enterWindow.style.display = "none";
});

//===========Production counter functionality===================================

const itemMinus               = document.querySelector(".product__item__main__controls__quantity__buttons-minus"),
      itemPlus                = document.querySelector(".product__item__main__controls__quantity__buttons-plus"),
      itemNumber              = document.querySelector("#product-counter"),
      itemHandlerArr          = new Array(itemMinus, itemPlus);
let   itemNumberValue         = +itemNumber.value;

itemHandlerArr.forEach((item, i) => {
  item.addEventListener("click", () => {
    if(itemNumberValue > 1 && i === 0) {
      itemNumberValue--;
    } else if(itemNumberValue < 99 && i === 1) {
      itemNumberValue++;
    }
    itemNumber.value = itemNumberValue;
  });
});
itemNumber.addEventListener("input", () => {
  if(isNaN(+itemNumber.value) || +itemNumber.value < 1) {
    itemNumberValue = 1;
    itemNumber.value = itemNumberValue;
  } else {
    itemNumberValue = +itemNumber.value;
  }
});
