"use strict";

//========================Hover effect for pics=================================
const blogImg = document.querySelectorAll(".blog__img");

blogImg.forEach(item => {
  item.addEventListener("mouseenter", () => {
    if(!item.children[1]) {
      let cover = document.createElement("img");
      cover.src = "img/blog/woman-cover.jpg";
      cover.alt = "woman-cover";
      cover.classList.add("cover");
      item.appendChild(cover);
    }
  });
});

blogImg.forEach(item => {
  item.addEventListener("mouseleave", () => {
    let cover = item.children[1];
    if(cover) {
      item.removeChild(cover);
    }
  });
});
