"use strict";
const
      brandsImgArr =              document.querySelectorAll(".brands__img"),
      template =                  document.querySelector("#template"),
      carouselIndicators =        document.querySelector(".carousel-indicators"),
      carouselIndicatorsDots =    document.querySelectorAll(".carousel-indicators-dots"),
      modalCheckbox =             document.querySelector(".modal-body-checkbox");

brandsImgArr.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    let brandsTemplateClone = template.content.cloneNode(true);
    item.appendChild(brandsTemplateClone);
  });
  item.addEventListener("mouseleave", (evt) => {
    let brandsOverlay = evt.target.querySelector("div");
    item.removeChild(brandsOverlay);
  });
});

carouselIndicators.addEventListener("click", (evt) => {
  if(evt.target.classList.contains("carousel-indicators-dots")) {
    carouselIndicatorsDots.forEach((item) => {
      item.firstElementChild.classList.add("hidden");
    });
    evt.target.firstElementChild.classList.remove("hidden");
  }
});

modalCheckbox.addEventListener("click", () => {
  modalCheckbox.children[0].classList.toggle("border-green");
  modalCheckbox.children[0].children[0].classList.toggle("red");
});
