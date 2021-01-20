import { check } from "prettier";
import { addClass, removeClass } from "./utils-class.js";

const sliders = document.getElementsByClassName("slider");
for (let index = 0; index < sliders.length; index++) {
  const slider = sliders[index];
  
  const items = slider.querySelectorAll(".slider .item");
  const preview = slider.querySelector("div > .preview");

  for (let index2 = 0; index2 < items.length; index2++) {
    const itemTrigger = items[index2];
    itemTrigger.addEventListener("click", function() {
      const dataImage = this.attributes?.["data-img"]?.value;
      for (let index3 = 0; index3 < items.length; index3++) {
        const triggerNeedToRemove = items[index3];
        removeClass(triggerNeedToRemove, "selected");
      }
      addClass(itemTrigger, "selected");
      preview.querySelector("img").setAttribute("src", dataImage)
    })
  }
}