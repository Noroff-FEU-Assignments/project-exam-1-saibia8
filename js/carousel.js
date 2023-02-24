const mainContainer = document.querySelector(".container");
const sliderContainer = document.querySelector(".slider-width");
const errorContainer = document.querySelector(".error-container");
const loader = document.querySelector(".loader");
const item = document.getElementsByClassName("carousel-item");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");

let slider = document.getElementsByClassName("slider-width")[0];
let itemLeft = 0;
let itemSlide = 0;
let count = 0;
let inc = 0;
let margin = 0;
let itemDisplay = 0;

sliderContainer.innerHTML = "";

async function getCarouselPosts() {
      let baseUrl = `https://greenbush.online/wp-json/wp/v2/posts/?_embed&per_page=12`;
   
      try {
         const response = await fetch(baseUrl);
         const carouselPosts = await response.json();

         loader.style.display = "none";
      
         carouselPosts.forEach(carouselPost => {
            postImage = carouselPost._embedded["wp:featuredmedia"]["0"].source_url;
            postAltText = carouselPost._embedded["wp:featuredmedia"]["0"].alt_text;
            postTitle = carouselPost.title.rendered;
            postId = carouselPost.id;
            postAuthor = carouselPost._embedded["author"]["0"].name;
            postDate = (carouselPost.date).substring(0, 10);
         
            sliderContainer.innerHTML += `<a href="/html/single-post.html?id=${postId}&slug=${carouselPost.slug}" aria-label="Read post">
                                            <article class="carousel-item">
                                              <img src="${postImage}" alt="${postAltText}">
                                              <time class="carousel-time">${postDate}</time>
                                              <address>${postAuthor}</address>
                                              <h3 class="fw-semi-bold fs-450 margin-bottom-half post-title">${postTitle}</h3>
                                              <a class="uppercase post-read-link" aria-label="Read post" href="/html/single-post.html?id=${postId}">Read post<i class="fa-solid fa-arrow-right-long"></i></a>
                                            </article>
                                           </a>`;
      });
      // How many elements to show in last display
      itemLeft = item.length % itemDisplay;
      // How many items to display
      itemSlide = Math.floor(item.length / itemDisplay) - 1;
      // For each item, divide the area of the container width from version 4, 3, 2, or 1 and assign it to the item
      for (let i = 0; i < item.length; i++) {
        item[i].style.width = mainContainer.clientWidth / itemDisplay - margin + "px";
      } 
   }
   catch (error) {
      loader.style.display = "none";
      errorContainer.innerHTML = errorMessage("Oops, an network error occurred when attempting to fetch resources. Try to refresh the page.");
   }
};

// How many items to display by container width
if (mainContainer.clientWidth > 990) {
  itemDisplay = document
    .getElementsByClassName("slider-container")[0]
    .getAttribute("item-display-desktop");
    margin = itemDisplay * 5;
}
if (mainContainer.clientWidth > 650 && mainContainer.clientWidth < 990) {
  itemDisplay = document
    .getElementsByClassName("slider-container")[0]
    .getAttribute("item-display-tablet");
    margin = itemDisplay * 6.8;
}
if (mainContainer.clientWidth > 450 && mainContainer.clientWidth < 650) {
  itemDisplay = document
    .getElementsByClassName("slider-container")[0]
    .getAttribute("item-display-tablet1");
    margin = itemDisplay * 10;
}
if (mainContainer.clientWidth > 230 && mainContainer.clientWidth < 450) {
  itemDisplay = document
    .getElementsByClassName("slider-container")[0]
    .getAttribute("item-display-mobil");
    margin = itemDisplay * 20;
}

// Move slider over 4 items
function next() {
  if (inc != itemSlide + itemLeft) {
    if (inc === itemSlide) {
      inc = inc + itemLeft;
      count = count - (mainContainer.clientWidth / itemDisplay) * itemLeft;
    } else {
      inc++;
      count = count - mainContainer.clientWidth;
    }
  }
  slider.style.left = count + "px";
  
  if (inc != 0) {
  btnLeft.style.visibility = "visible";
  }

  if ((itemDisplay == 4 && inc == 2) || (itemDisplay == 3 && inc == 3) || (itemDisplay == 2 && inc == 5) || (itemDisplay == 1 && inc == 11)) {
    btnRight.style.visibility = "hidden";
  }
}
// Return within 4 items slider
function prev() {
  if (inc != 0) {
    if (inc === itemLeft) {
      inc = inc - itemLeft;
      count = count + (mainContainer.clientWidth / itemDisplay) * itemLeft;
    } else {
      inc--;
      count = count + mainContainer.clientWidth;
    }
  }
  slider.style.left = count + "px";

  if (inc == 0) {
    btnLeft.style.visibility = "hidden";
    }

    if ((itemDisplay == 4 && inc == 1) || (itemDisplay == 3 && inc == 2) || (itemDisplay == 2 && inc == 4) || (itemDisplay == 1 && inc == 10)) {
      btnRight.style.visibility = "visible";
    }
}

getCarouselPosts();






