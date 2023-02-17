const aboutContainer = document.querySelector(".about-container");
const loader = document.querySelector(".loader");
const pageTitle = document.querySelector("title");

const url = `https://greenbush.online/wp-json/wp/v2/pages/69?_embed`;

async function getAboutContent() {
   try {
      const response = await fetch(url);
      const about = await response.json();

      pageTitle.innerHTML = `Sweet Cactus | ${about.title.rendered}`;
      loader.style.display = "none";

      aboutImg = about._embedded["wp:featuredmedia"]["0"].source_url;
      aboutAltText = about._embedded["wp:featuredmedia"]["0"].alt_text;
      aboutHeading = about.title.rendered;
      aboutContent = about.content.rendered;

      aboutContainer.innerHTML = `<div class="about-img circle about-circle">
                                    <img src="${aboutImg}" alt="${aboutAltText}">
                                 </div>
                                 <div class="about-content">
                                    <h1 class="fs-secondary-heading fs-600 text-center fw-semi-bold margin-bottom-half">${aboutHeading}</h1>
                                    <p>${aboutContent}</p>
                                 </div>`;
   } catch (error) {
      loader.style.display = "none";
      aboutContainer.innerHTML = errorMessage("Oops, an network error occurred when attempting to fetch resources. Try to refresh the page.");
   }
};

getAboutContent();