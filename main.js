import { gallery } from "./pictures.js";

const slideImage = [];
const slidesContainer = document.querySelector(".container");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
const navigationDots = document.querySelector(".navigationDots");
const counter = document.querySelector(".counter")

let numberOfImages = gallery.length;
let currentSlide = 0;

let stepTime = 4000;
let imageID = 0;

const setActiveClass = () => {

  let currentActive = document.querySelector(".slideImage.active");
  currentActive.classList.remove("active");
  currentActive.style.display = 'none'
  slidesContainer.children[currentSlide].classList.add("active");
  slidesContainer.children[currentSlide].style.display = 'block'

  let currentDot = document.querySelector(".singleDot.active");
  currentDot.classList.remove("active");
  navigationDots.children[currentSlide].classList.add("active");
}

const setCounter = () => {
  counter.innerHTML = `${currentSlide+1} / ${gallery.length}` 
}

const goToSlide = (slideNumber) => {
  currentSlide = slideNumber;
  setActiveClass();
  setCounter();
}

const init = () => {
  gallery.forEach((item, idx) => {
    let div = document.createElement("div")
    div.classList.add('slideImage')
    let image = document.createElement("img")
    image.src = item.src
    image.style.left = idx * 100 + "%";
    div.appendChild(image);
    let caption = document.createElement("div")
    caption.classList.add('caption')
    caption.innerText = item.caption
    div.appendChild(caption)
    slideImage.push(div)
    if (idx != 0) {
      div.style.display = "none";
    } 
    slidesContainer.appendChild(div);
  });
  slidesContainer.children[0].classList.add("active");

  createNavigationDots();
  setCounter();
}

init();


function createNavigationDots() {
  for (let i = 0; i < numberOfImages; i++) {
    const dot = document.createElement("div");
    dot.classList.add("singleDot");
    navigationDots.appendChild(dot);

    dot.addEventListener("click", () => {
      goToSlide(i);
    });
  }

  navigationDots.children[0].classList.add("active");
}


nextBtn.addEventListener("click", () => {
  if (currentSlide >= numberOfImages - 1) {
    goToSlide(0);
    return;
  }

  currentSlide++;
  goToSlide(currentSlide);
});


prevBtn.addEventListener("click", () => {
  if (currentSlide <= 0) {
    goToSlide(numberOfImages - 1);
    return;
  }

  currentSlide--;
  goToSlide(currentSlide);
});

setInterval(() => {
  console.log(imageID)
  imageID === 2 ? (imageID = 0) : imageID++;
  goToSlide(imageID);
}, stepTime);
