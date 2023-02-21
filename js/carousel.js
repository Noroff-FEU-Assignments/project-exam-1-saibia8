const mainContainer = document.querySelector(".container");
const sliderContainer = document.querySelector(".slider-width");
const errorContainer = document.querySelector(".error-container");
const loader = document.querySelector(".loader");
const item = document.getElementsByClassName('carousel-item');
let slider = document.getElementsByClassName('slider-width')[0];
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
            // postContent = carouselPost.excerpt.rendered;
            postId = carouselPost.id;
         
            sliderContainer.innerHTML += `<article class="carousel-item">
                                               <a href="/html/single-post.html?id=${postId}">
                                                  <img src="${postImage}" alt="${postAltText}">
                                                  <h3 class="fw-medium fs-450 margin-bottom-half post-title">${ postTitle}</h3>
                                                  <a class="uppercase post-read-link" href="/html/single-post.html?id=${postId}">Read more<i class="fa-solid fa-arrow-right-long"></i></a>
                                               </a>
                                            </article>`;
      });
      //gauni kiek parodyti paskutiniam parodyme elementu
      itemLeft = item.length % itemDisplay;
      //Kiek slaidu rodyti
      itemSlide = Math.floor(item.length / itemDisplay) - 1;
      //kiekvienam itemui padalinti ekrano dydi is versijos 4 ar 3 ar 1 ir priskirti itemui
      for (let i = 0; i < item.length; i++) {
        item[i].style.width = mainContainer.clientWidth / itemDisplay - margin + 'px';
      } 
   }
   catch (error) {
      loader.style.display = "none";
      errorContainer.innerHTML = errorMessage("Oops, an network error occurred when attempting to fetch resources. Try to refresh the page.");
   }
};

// pagal ekrano ploti kiek elementu rodyti
if (mainContainer.clientWidth > 990) {
  itemDisplay = document
    .getElementsByClassName('slider-container')[0]
    .getAttribute('item-display-desktop');
    margin = itemDisplay * 5;
}
if (mainContainer.clientWidth > 650 && mainContainer.clientWidth < 990) {
  itemDisplay = document
    .getElementsByClassName('slider-container')[0]
    .getAttribute('item-display-tablet');
    margin = itemDisplay * 6.8;
}
if (mainContainer.clientWidth > 450 && mainContainer.clientWidth < 650) {
  itemDisplay = document
    .getElementsByClassName('slider-container')[0]
    .getAttribute('item-display-tablet1');
    margin = itemDisplay * 10;
}
if (mainContainer.clientWidth > 230 && mainContainer.clientWidth < 450) {
  itemDisplay = document
    .getElementsByClassName('slider-container')[0]
    .getAttribute('item-display-mobil');
    margin = itemDisplay * 20;
}

// pastumti slaideri per 4 elementus
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
  slider.style.left = count + 'px';
}
//grazinti slaideri per 4 elementus
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
  slider.style.left = count + 'px';
}

getCarouselPosts();






