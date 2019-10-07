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

//================Map Overlay functionality=====================================
const mapOverlay = document.querySelector(".map__overlay");

mapOverlay.addEventListener("click", () => {
  mapOverlay.classList.toggle("invisible");
})
