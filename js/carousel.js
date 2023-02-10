const container = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slide");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

// Offset value for the slides container
let offset = 0;

// Slide id on increment
let slideIncrement = 0;

// Slide id on decrement
let slideDecrement = slides.length - 1;

// Add click event to the right arrow
arrowRight.addEventListener("click", () => {
  // Disable right arrow
  arrowRight.disabled = true;

  // Set offset to slide width
  offset = slides[0].offsetWidth;

  // Set container transition
  container.style.transition = "left easy-in-out 500ms";

  // Move slides container by negative offset
  container.style.left = -offset + "px";

  // Set a timeout
  setTimeout(() => {
    // Remove container transition
    container.style.transition = "none";

    // Move the current slide to the last position
    slides[slideIncrement].style.order = slides.leght - 1;

    // Move the container back to the starting position
    container.style.left = 0;

    // Increment slide increment id
    slideIncrement++;

    // Set decrement id to the previous icrement id
    slideDecrement = slideIncrement - 1;

    // If the slide increment id reaches the slides lenght
    if (slideIncrement === slides.length) {
      // Set the slide increment id to zero
      slideIncrement = 0;
      // Select all slides
      slides.forEach((slide) => {
        // Reset all slides order
        slide.style.order = "initial";
      });
    }
    // Enable right arrow click
    arrowRight.disabled = false;
  }, 500);
});

// Add click event to the left arrow
arrowLeft.addEventListener("click", () => {
  // Disable left arrow
  arrowLeft.disabled = true;

  // Set offset to slide width
  offset = slides[0].offsetWidth;

  // Remove container transition
  container.style.transition = "none";

  // Check if slide decrement is below zero
  if (slideDecrement < 0) {
    // Select all slides
    slides.forEach((slide) => {
      // Reset all slides order
      slide.style.order = "initial";
    });
    //   Set decrement id to last slide index
    slideDecrement = slides.length - 1;
  }
  // Move the current slide to the first position
  slides[slideDecrement].style.order = "-1";

  // Move slides container by negative offset
  container.style.left = -offset + "px";
  //   Set a short timeout
  setTimeout(() => {
    // Set container transition
    container.style.transition = "left easy-in-out 500ms";

      // Move the container back to the starting position
      container.style.left = 0;
  }, 1);
//   Set a timeout
setTimeout(() => {
   // Decrement slide decrement id
   slideDecrement--;
   // Set decrement id to previous decrement id
   slideIncrement = slideDecrement + 1;
   // Enable left arrow click
   arrowLeft.disabled = false;
}, 500);
});
