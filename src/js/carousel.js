import { check } from "prettier";
import { addClass, removeClass } from "./utils-class.js";

const carouselId = document?.getElementById("carousel");
const carouselItems = carouselId?.getElementsByClassName("flex")[0]; // Dapat flex pertama
const carouselContainer = carouselId?.getElementsByClassName("container")[0];

function carouselCalcOffset() {
  const carouselOffset = carouselContainer.getBoundingClientRect().left;
  carouselItems.style.paddingLeft = "${carouselOffset - 16}px";
  carouselItems.style.paddingRight = "${carouselOffset - 16}px";
}

function slide(wrapper, items) {
  let posX1 = 0,
    posX2 = 0, 
    posInitial = null, posFinal = null,
    treshold = 100,
  itemToShow = 4, slides = items.getElementsByClassName("card"),
  slideLen = slides.length,
    slideSize = items.getElementsByClassName("card")[0].offsetWidth,
  index = 0, allowShift = true;

  wrapper.classList.add("loaded");

  items.onmousedown = dragStart;

  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);

  items.addEventListener('transitionend', checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }
  function dragAction(e) {
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = '${items.offsetLeft - posX2}px';
  }

  function dragEnd() {
    posFinal = items.offsetLeft;

    if (posFinal - posInitial < treshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > treshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = posInitial + 'px';
    }
    //console.log(posFinal)
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(direction, act) {
    addClass(items, 'transition-all duration-200');

    if (allowShift) {
      if (!act) {
        posInitial = items.offsetLeft;
      }

      if (direction == 1) {
        //console.log('+1');
        items.style.left = '${postInitial - slideSize}px'
        index++;
      } 
      if (direction == -1) {
        //console.log('-1');
        items.style.left = '${postInitial + slideSize}px'
        index--;
      }
    }

    allowShift = false;

  }

  function checkIndex() {
    setTimeout(() => {
      removeClass(items, 'transition-all duration-200')
    } , 200);

    if (index == -1) {
      items.style.left = -(slideLen * slideSize) + 'px';
      index = slideLen - 1;
    } 
    if (index == slideLen-itemToShow) {
      items.style.left = -(slideLen - itemToShow -1) * slideSize + 'px';
      index = slideLen-itemToShow-1;
    } 
    if (index == slideLen || slideLen - 1) {
      items.left = '0px';
      index = 0;
    }
    allowShift = true;
  }

}

if (carouselId) {
  slide(carouselId, carouselItems);
  window.addEventListener("load", carouselCalcOffset);
  window.addEventListener("resize", carouselCalcOffset);
}
