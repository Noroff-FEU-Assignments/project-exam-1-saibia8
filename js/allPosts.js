const baseUrl = "https://greenbush.online/wp-json/wp/v2/posts?_embed&per_page=9";
const postsContainer = document.querySelector(".posts-container");
const loader = document.querySelector(".loader");

postsContainer.innerHTML = "";

async function getPosts(url) {
   try {
      const response = await fetch(url);
      const posts = await response.json();
     
      loader.style.display = "none";

      posts.forEach(post => {
         postImage = post._embedded["wp:featuredmedia"]["0"].source_url;
         postAltText = post._embedded["wp:featuredmedia"]["0"].alt_text;
         postTitle = post.title.rendered;
         postContent = post.excerpt.rendered;


         postsContainer.innerHTML += `<article class="posts-wrapper">
                                          <img class="margin-bottom-half" src="${postImage}" alt="${postAltText}">
                                          <h2 class="fw-medium fs-500">${ postTitle}</h2>
                                          <p class="margin-bottom">${postContent}</p>
                                          <a class="uppercase" href="#">Read more<i class="fa-solid fa-arrow-right-long"></i></a>
                                       </article>`;
      });
   }
   catch (error) {
      postsContainer.innerHTML = errorMessage("Oops, an error occured when calling the API.");
   }
};

getPosts(baseUrl);



