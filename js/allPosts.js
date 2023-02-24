const postsContainer = document.querySelector(".posts-container");
const noPostsContainer = document.querySelector(".no-posts");
const errorContainer = document.querySelector(".error-container");
const loader = document.querySelector(".loader");
const btnShowMore = document.querySelector(".button-show-more");

let postPageCounter = 1;
let totalPages;
let showHideButton = true;

postsContainer.innerHTML = "";

async function getPosts(page) {
      let baseUrl = `https://greenbush.online/wp-json/wp/v2/posts/?_embed&page=${page}`;
   
      try {
         const response = await fetch(baseUrl);
         const posts = await response.json();
     
         loader.style.display = "none";

         if(showHideButton) { 
            btnShowMore.style.display = "block";
         };
      
         posts.forEach(post => {
            postImage = post._embedded["wp:featuredmedia"]["0"].source_url;
            postAltText = post._embedded["wp:featuredmedia"]["0"].alt_text;
            postTitle = post.title.rendered;
            postContent = post.excerpt.rendered;
            postAuthor = post._embedded["author"]["0"].name;
            postDate = (post.date).substring(0, 10);
            
            totalPages = response.headers.get("X-WP-TotalPages");

            postsContainer.innerHTML += `<article class="posts-wrapper">
                                             <a href="single-post.html?id=${post.id}&slug=${post.slug}">
                                                <img class="margin-bottom-half" src="${postImage}" alt="${postAltText}"> 
                                                <div class="post-date-author">
                                                <time class="fw-medium">${postDate}</time>
                                                <address>${postAuthor}</address>
                                                </div>                 
                                                <h2 class="fw-medium fs-450 margin-bottom-half">${ postTitle}</h2>
                                                <p>${postContent}</p>
                                                <a class="uppercase post-read-link" title="Read more" href="single-post.html?id=${post.id}&slug=${post.slug}">Read post<i class="fa-solid fa-arrow-right-long"></i></a>
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

  if(postPageCounter == totalPages) {
   btnShowMore.style.display = "none";
   getPosts(postPageCounter);
   showHideButton = false;
   noPostsContainer.style.display = "block";
  }else {
   getPosts(postPageCounter);
  }
});



