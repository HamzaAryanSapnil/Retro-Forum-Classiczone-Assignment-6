const loadLatestPost = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const data = await res.json();
    
    let latestPosts = data;
    displayLatestPost(latestPosts);
  } catch (error) {
    console.log("Something problem here: ", error);
  }
};

const displayLatestPost = (latestPosts) => {
    const latestPostContainer = document.getElementById("latest-post-container");



    latestPosts.forEach((post) => {
        
        const { cover_image: coverImage, profile_image: profileImage, title: title, description: postContent, author: {name: authorName, designation: authorDesignation, posted_date: publishedDate}  } = post;
        
        

        const latestPostDiv = document.createElement("div");
        latestPostDiv.classList = `card bg-base-100 shadow-xl`;


        
        
        latestPostDiv.innerHTML = `
        <figure ><img src="${coverImage}" alt="Shoes" /></figure>
        <figcaption class="flex gap-x-2 mt-4"><i><img src="images/Frame.png" alt="" srcset=""></i> ${publishedDate? publishedDate : "No Publish Date"}</figcaption>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${postContent}</p>
            <article class="flex gap-x-4">
                        <img class="w-12 h-12 rounded-full" src="${profileImage}" alt="" srcset="">
                        <p><span class="font-bold">${authorName}</span> <br>
                        ${authorDesignation? authorDesignation : "Unknown"}
                        </p>
                      </article>
        </div>
        `;
        latestPostContainer.appendChild(latestPostDiv);
    })
}

loadLatestPost();