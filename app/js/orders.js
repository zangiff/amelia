"use strict";

window.addEventListener("load", () => {
//===================Illuminating "New" Label===================================
  let bodyRowCollection = document.querySelectorAll(".orders__table__body__row");
  for(let i = 0; i < bodyRowCollection.length; i++) {
    if(bodyRowCollection[i].children[2].textContent.toLowerCase() === "новый") {
      bodyRowCollection[i].children[2].classList.add("red");
    }
  }
//=============================Page reloading===================================
  document.addEventListener("click", evt =>{
    if(evt.target.alt === "reload") {
      let phpUrl              = "php/u1.php",
      //======================Понимаю, что на странице будет выглядеть коряво, но пусть будет на этом уровне так.....=============================
          xhr                 = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let closestTr = evt.target.closest("tr");
          closestTr.children[2].textContent = xhr.responseText;
        }
      }
      xhr.open("GET", phpUrl, true);
      xhr.send();
    }
    if(evt.target.alt === "remove") {
      evt.target.closest("tr").classList.add("hidden");
    }
  });
});
