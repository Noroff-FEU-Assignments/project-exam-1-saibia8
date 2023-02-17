const postsContainer = document.querySelector(".posts-container");
const loader = document.querySelector(".loader");
errorContainer = document.querySelector(".error-container");
const btnShowMore = document.querySelector(".button-show-more");

let postPageCounter = 1;
postsContainer.innerHTML = "";

async function getPosts(page) {
      let baseUrl = `https://greenbush.online/wp-json/wp/v2/posts/?_embed&page=${page}`;
   try {
   
      const response = await fetch(baseUrl);
      const posts = await response.json();
     
      loader.style.display = "none";
      btnShowMore.style.display = "block";

      posts.forEach(post => {
         postImage = post._embedded["wp:featuredmedia"]["0"].source_url;
         postAltText = post._embedded["wp:featuredmedia"]["0"].alt_text;
         postTitle = post.title.rendered;
         postContent = post.excerpt.rendered;
         
      //    totalPages = response.headers.get("X-WP-TotalPages");
      //   console.log(totalPages);

         postsContainer.innerHTML += `<article class="posts-wrapper">
                                          <a href="single-post.html?id=${post.id}">
                                                <img class="margin-bottom-half" src="${postImage}" alt="${postAltText}">                       
                                                <h2 class="fw-medium fs-450 margin-bottom-half">${ postTitle}</h2>
                                                <p>${postContent}</p>
                                                <a class="uppercase post-read-link" href="single-post.html?id=${post.id}">Read more<i class="fa-solid fa-arrow-right-long"></i></a>
                                             </a>
                                          </article>`;
      });
   }
   catch (error) {
      loader.style.display = "none";
      errorContainer.innerHTML = errorMessage("Oops, an network error occurred when attempting to fetch resources. Try to refresh the page.");
   }
};

getPosts(postPageCounter);

btnShowMore.addEventListener("click", () => {
  postPageCounter++;
  if (postPageCounter === 2) {
   getPosts(postPageCounter);
   postsContainer.innerHTML += ``;
   console.log(btnShowMore);
   btnShowMore.style.display = "none";
  }
});





