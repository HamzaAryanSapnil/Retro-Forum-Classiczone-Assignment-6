const loadLetsDiscussPosts = async (category) => {
    toggleLoader(true);
    try {
        const res = await fetch(
            `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
        );
        const data = await res.json();
        
        
        const letsDiscussPosts = data.posts;
        displayLetsDiscussPosts(letsDiscussPosts);
    } catch (error) {
        console.log("Something problem here: ", error);
    }
};


const displayLetsDiscussPosts = (letsDiscussPosts) => {
    const letsDiscussPostsContainer = document.getElementById(
        "lets-discuss-posts-container-section"
    );

    letsDiscussPostsContainer.textContent = ``;


    letsDiscussPosts.forEach((letsDiscussPost) => {
        
        const { id: id, image: image, title: title, description: postContent, category: category,comment_count: comments, view_count: views, posted_time: postedTime , author: { name: authorName}, isActive: isActive } = letsDiscussPost
        

        
        
        
        const letsDiscussPostDiv = document.createElement("div");
        letsDiscussPostDiv.classList = "card  bg-base-100 shadow-xl";

        

        

        letsDiscussPostDiv.innerHTML = `
        <div class="flex flex-col lg:flex-row p-8 lg:p-11 gap-x-8 items-center font-inter">
                <figure class="lg:w-1/3"><img class="lg:w-32 lg:h-32 rounded-2xl " src="${image}" alt="Shoes" />
                <div  class="hidden lg:block rounded-full ${isActive ? "bg-green-500" : "bg-red-500"} h-4 w-4 relative bottom-14 right-3"></div>
                </figure>
                <div class="flex-1">
                  <div class="flex gap-x-4 lg:gap-x-12 py-2 text-center text-bannerBgCardEighty">
                    <p>#<span>${category}</span></p>
                    <p>Author: ${authorName}</p>
                  </div>
                  <p class="lg:hidden">Active Status: <span class="${isActive ? "text-green-500" : "text-red-500"}"><i class="fa-solid fa-circle"></i> ${isActive ? "Online" : "Offline"}</span></p>
                  <h2 class="card-title font-mulish text-bannerBg font-bold text-xl">${title}</h2>
                  <p class="text-bannerBgCardSixty">${postContent}</p>
                  <div class="card-actions flex justify-between items-center border-t-2 border-dashed py-8 mt-8">
                    <div class="flex flex-col md:flex-row gap-x-10 ">

                      <p class="space-x-2"><i class="fa-solid fa-message"></i> <span class="text-bannerBgCardSixty">${comments}</span></p>
                      <p class="space-x-2"><i class="fa-solid fa-eye"></i> <span class="text-bannerBgCardSixty">${views}</span></p>
                      <p class="space-x-2"><i class="fa-solid fa-clock"></i> <span class="text-bannerBgCardSixty">${postedTime}</span></p>
                    </div>
                    <button onclick="handleWatchCardBtn('${escape(title)}', '${views}')" class="btn btn-active btn-accent text-white rounded-full "><i class="fa-solid fa-envelope-open"></i></button>
                  </div>
                </div>
              </div>
        `





        
        letsDiscussPostsContainer.appendChild(letsDiscussPostDiv);




    });
    
    setTimeout(() => {
        
        toggleLoader(false);
    }, 2000);
}


const watchCardDivContainer = document.getElementById("watch-card-div");
const watchCardViews = document.getElementById("watch-card-views");
const markAsReadIndicator = document.getElementById("mark-read");
let count = 0;
const handleWatchCardBtn = (title, views) => {
    console.log("clicked", title, views);
    const watchCardDiv = document.createElement("div");
    watchCardDiv.innerHTML = `
    <div class="flex justify-between items-start  w-full  mb-4">
        <h2 class=" card-title font-mulish text-bannerBg font-bold text-xl">${unescape(title)}</h2>
    <p class="flex items-center gap-x-3 "><i class="fa-solid fa-eye"></i><span class="text-bannerBgCardSixty">${views}</span></p>
    </div>
    `
    watchCardDivContainer.appendChild(watchCardDiv);

    markAsReadIndicator.classList.add("text-green-500");
    count++;
    watchCardViews.innerText = count;
} 
    
  










const searchBtn = document.getElementById("search-btn");
const searchField = document.getElementById("search-field");

const handleSearch = async() => {
    toggleLoader(true);
    const searchText = searchField.value;
    console.log(searchText);
    loadLetsDiscussPosts(searchText);
}

const toggleLoader = (isLoading) =>{
    const loader = document.getElementById("loader");
    if (isLoading) {
        loader.classList.remove("hidden");
    }else{
        loader.classList.add("hidden");
    }
}

searchBtn.addEventListener("click",()=>{
    handleSearch();
})















loadLetsDiscussPosts("comedy");