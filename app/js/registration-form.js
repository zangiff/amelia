"use strict";

//==============Captcha functionality===========================================
const   captchaPicsWrap               = document.querySelector(".registration__form__captcha-pics"),
        captchaInput                  = document.querySelector("#registration-captcha"),
        captchaButton                 = document.querySelector(".registration__form__button"),
        prefix                        = "img/card-product/",
        suffix                        = ".gif",
        inputCollection               = document.querySelectorAll("input"),
        regInputCollection            = document.querySelectorAll(".registration__form-input"),
        regExpCollection             = [
                                          /^[A-ZА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
                                          /^[A-ZА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
                                          /(?=^.{6,}$)(?=.*[a-zA-Z])(?!.*\s).*$/,
                                          /(?=^.{6,}$)(?=.*[a-zZ-Z])(?!.*\s).*$/,
                                          /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
                                        ];
let     randomNumbers                 = randomArrGenerator(4),
        placeholderCollection         = [];

document.addEventListener("DOMContentLoaded", () => {
  randomNumbers.forEach(item => {
    let img = document.createElement("img");
    img.src = prefix + item + suffix;
    captchaPicsWrap.appendChild(img);
  });
});


captchaInput.addEventListener("blur", () => {
  let existNode = captchaInput.parentNode.children[1];
  if(existNode) {
    existNode.parentNode.removeChild(existNode);
  }
  if(captchaInput.value == randomNumbers.join("")) {
    if(captchaInput.value.length !== 0) {
      stylizeInput(captchaInput, "green", "rgba(0, 255, 0, .5)", "white");
      let inputSuccessText = document.createElement("p");
      inputSuccessText.textContent = "Проверка пройдена";
      inputSuccessText.style.color = "green";
      captchaInput.parentNode.appendChild(inputSuccessText);
    } else {
      captchaInput.style.border = "1px solid #ccc";
    }
    captchaButton.removeAttribute("disabled");
  } else {
    if(captchaInput.value.length !== 0) {
      stylizeInput(captchaInput, "red", "rgba(255, 0, 0, .5)", "white");
      let inputWarningText = document.createElement("p");
      inputWarningText.textContent = "Введите код с изображения корректно";
      inputWarningText.style.color = "red";
      captchaInput.parentNode.appendChild(inputWarningText);
    } else {
      stylizeInput(captchaInput, "#ccc", "white", "#333");
    }
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

//==================Placeholder disabled with a STAR============================
for(let i = 0; i < inputCollection.length; i++) {
  placeholderCollection[i] = inputCollection[i].placeholder;
}
inputCollection.forEach((item, i) => {
  item.addEventListener("focus", evt => {
    stylizeInput(evt.target, "#666", "white", "#333");
    evt.target.value = "";
    evt.target.placeholder = "";
    starHide(evt.target);
  });
  item.addEventListener("blur", evt => {
    evt.target.placeholder = placeholderCollection[i];
    starShow(evt.target);
  })
})

function starHide(elem) {
  if(elem.parentNode.children[1]) {
    elem.parentNode.children[1].style.display = "none";
  }
}

function starShow(elem) {
  if(elem.parentNode.children[1]) {
    elem.parentNode.children[1].style.display = "block";
  }
}

//================Registration form Input style=================================
regInputCollection.forEach((item, i) => {
  item.addEventListener("blur", evt => {
    if(evt.target.value.match(regExpCollection[i]) && evt.target.value.length != 0) {
      stylizeInput(evt.target, "green", "rgba(0, 255, 0, .5)", "white");
    } else if(!evt.target.value.match(regExpCollection[i]) && evt.target.value.length != 0) {
      stylizeInput(evt.target, "red", "rgba(255, 0, 0, .5)", "white");
    }
    else {
      stylizeInput(evt.target, "#ccc", "white", "#333");
    }
    if(regInputCollection[3].value !== regInputCollection[2].value && regInputCollection[3].value.length > 0) {
      stylizeInput(regInputCollection[3], "red", "rgba(255, 0, 0, .5)", "white");
    }
  });
});


function stylizeInput(target, borderColor, backgroundColor, textColor) {
  target.style.border = "1px solid " + borderColor;
  target.style.background = backgroundColor;
  target.style.color = textColor;
}
