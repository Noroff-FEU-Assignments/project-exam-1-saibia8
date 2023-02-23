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

      singlePostImage = singlePost._embedded["wp:featuredmedia"]["0"].source_url;
      singlePostAltText = singlePost._embedded["wp:featuredmedia"]["0"].alt_text;
      singlePostTitle = singlePost.title.rendered;
      singlePostContent = singlePost.content.rendered;
      singlePostAuthor = singlePost._embedded["author"]["0"].name;
      singlePostDate = (singlePost.date).substring(0, 10);

      pageTitle.innerHTML = `Sweet Cactus | ${singlePostTitle}`;
      loader.style.display = "none";

      postContainer.innerHTML = `<a class="button-back-posts" 
                                 href="posts.html"><i class="fa-solid fa-arrow-left-long"></i>Back to all posts</a>                                      
                                 <img class="margin-auto post-img"
                                 src="${singlePostImage}"
                                 alt="${singlePostAltText}">
                                 <div class="post-date-author text-center">
                                    <time class="fw-medium">${singlePostDate}</time>
                                    <address>${singlePostAuthor}</address>
                                 </div>
                                 <div class="modal-container">
                                    <img class="modal-image margin-auto"
                                    src="${singlePostImage}"
                                    alt="${singlePostAltText}">
                                    <button><i class="fa-solid fa-xmark modal-close-btn"></i></button>
                                 </div>
                                 <h1 class="fs-secondary-heading text-center fw-semi-bold margin-bottom">${singlePostTitle}</h1>
                                 <p class="margin-auto">${singlePostContent}</p>`; 

      // Modal window                        
      const imgModal = document.querySelector(".post-img");
      const modalContainer = document.querySelector(".modal-container");
  
      imgModal.addEventListener("click", openModal); 
      function openModal() {
         imgModal.style.display = "none";
         modalContainer.style.display = "block";
      }

      window.addEventListener("click", closeModal);
      function closeModal(e) {
         if (e.target == modalContainer) {
            imgModal.style.display = "block";
            modalContainer.style.display = "none";
         }

      const closeBtn = document.querySelector("button");
      closeBtn.addEventListener("click", closeCrossModal);
      function closeCrossModal() {
         imgModal.style.display = "block";
         modalContainer.style.display = "none";
      } 
   }
   } catch (error) {
      loader.style.display = "none";
      postContainer.innerHTML = errorMessage("Oops, an network error occurred when attempting to fetch resources. Try to refresh the page.");
   }
};

fetchSinglePost();
