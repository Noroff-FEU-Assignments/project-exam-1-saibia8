const postContainer = document.querySelector(".post-container");
const loader = document.querySelector(".loader");
const pageTitle = document.querySelector("title");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = `https://greenbush.online/wp-json/wp/v2/posts/${id}?_embed`;

async function fetchSinglePost() {
   try {
      const response = await fetch(url);
      const singlePost = await response.json();

      console.log(singlePost);

      singlePostImage = singlePost._embedded["wp:featuredmedia"]["0"].source_url;
      singlePostAltText = singlePost._embedded["wp:featuredmedia"]["0"].alt_text;
      singlePostTitle = singlePost.title.rendered;
      singlePostContent = singlePost.content.rendered;

      pageTitle.innerHTML = `Sweet Cactus | ${singlePostTitle}`;
      loader.style.display = "none";

      postContainer.innerHTML = `<img class="margin-auto" src="${singlePostImage}" 
                                   alt="${singlePostAltText}">
                                   <h1 class="fs-secondary-heading fs-600 text-center fw-semi-bold margin-bottom">${singlePostTitle}</h1>
                                   <p class="margin-auto">${singlePostContent}</p>`;

   } catch (error) {
      loader.style.display = "none";
      postContainer.innerHTML = errorMessage("Oops, an network error occurred when attempting to fetch resources. Try to refresh the page.");
   }
};

fetchSinglePost();