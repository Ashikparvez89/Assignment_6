
const getSearchPost = async (query) => {
    const response = await fetch(
        `https://openapi.programming-hero.com/api/retro-forum/posts${query}`,
    );
    const convertPost = await response.json();
    console.log(convertPost)
    const getPostconatiner = document.getElementById("posts");

    getPostconatiner.textContent = '';
    let increase = 1;
    convertPost.posts.forEach((element) => {
        const makediv = document.createElement("div");

        makediv.innerHTML = `
         <div
         class="flex-col lg:flex-row md:flex-row flex justify-between gap-10 p-5 lg:p-10 bg-[#f2f2ff] rounded-2xl mt-5 inter">
         

        <div class="my-element ${element.isActive ? 'avatar online' : 'avatar offline'}">
          <!-- Other content here -->
          <div class="rounded-xl" style="width: 170px;">
          <img style="border-radius: 8%;" src="${element.image}" />
          </div>
        </div>

  
         <div class="">
             <div class="flex gap-6 lg:gap-10">
                 <h1># <span>${element.category}</span> </h1>
                 <h1>Author : <span>${element.author.name}</span></h1>
             </div>
             <h1 class="text-2xl font-bold text-black py-4 lg:py-6 mulish">${element.title}</h1>
             <p class="text-lg lg:text-xl mb-2 lg:mb-5 text-[#6c6c81]">${element.description}</p>
             <hr>
             <div class="icon flex justify-between py-4 items-center">
                 <div class="text-[#6c6c81] text-lg lg:text-xl flex gap-2 md:gap-4 lg:gap-10">
                     <div
                         class="inline-flex justify-center items-center content-center gap-2 md:gap-4 lg:gap-5">
                         <span><i class="fa-regular fa-message"></i></span>
                         <p>${element.comment_count}</p>
                     </div>
                     <div
                         class="inline-flex justify-center items-center content-center  gap-2 md:gap-4 lg:gap-5">
                         <span><i class="fa-regular fa-eye"></i></span>
                         <p>${element.view_count}</p>
                     </div>
                     <div
                         class="inline-flex justify-center items-center content-center  gap-2 md:gap-4 lg:gap-5">
                         <span><i class="fa-regular fa-clock"></i></span>
                         <p>${element.posted_time}</p>
                     </div>
                 </div>
                 <div class="increasebtn cursor-pointer">
                     <button onclick="handlleClick('${element.title}','${element.view_count}')"><span " class="rounded-full p-4 text-xl"><i class="fa-regular fa-envelope-open"></i></span>
                     </button>
                 </div>
             </div>
  
         </div>
     </div>
         
         `;

        getPostconatiner.appendChild(makediv);

    });
    loadingspinner(false);

    // active status is not working

    const getbtn = document.querySelectorAll('.increasebtn span');
    for (const btn of getbtn) {
        btn.addEventListener("click", function () {
            increseer.innerText = increase;
            increase++;
            console.log(increase)
            btn.style.setProperty('color', 'white');
            btn.style.setProperty('background-color', '#10b981');

        });
    }
    let increseer = document.getElementById('increaser')

};


const handlesearch =()=> {
    loadingspinner(true);
    const seacrh = document.getElementById('searchbox');
    const searchText = seacrh.value;
    console.log(searchText);
    getSearchPost(`?category=${searchText}`)
}



getSearchPost('');



const loadingspinner = (isLoading)=>{
    const getspinner = document.getElementById('loadingspninner');
    if(isLoading){
        getspinner.classList.remove('hidden')
    }
    else{
        getspinner.classList.add('hidden')
    }

}



const loadLatest = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/retro-forum/latest-posts",
    );

    const data = await res.json();
    const loadPostContainer = document.getElementById("loadlatestposts");
    data.forEach((element) => {
        const latestdiv = document.createElement("div");
        latestdiv.innerHTML = `
          <div
          class="w-full card card-compact mx-auto shadow-xl p-10 bg-white border border-[#dbdce0] rounded-2xl">
          <figure><img src="${element.cover_image}"
                  alt="Shoes" /></figure>
          <div class="card-body p-4">
          <p>
          <span class="mr-2"><i class="fa-regular fa-calendar"></i></span>
          <span>${element?.author?.posted_date || "No date found"}</span>
          </p>
  
              <p class="text-black text-lg lg:text-xl font-bold">${element.title}</p>
              <p>${element.description}</p>
              <div class="flex items-center gap-7 mt-4">
                  <div class="">
                      <img class="w-[100px] rounded-full" src="${element.profile_image}" alt="">
                  </div>
                  <div class=" text-black font-semibold">
                      <h1 class="text-lg">${element.author.name}</h1>
                      <p class="">${element?.author?.designation || "No Designation found"}</p>
                  </div>
  
              </div>
          </div>
      </div>
  
          
          `;
        loadPostContainer.appendChild(latestdiv);


    });
};



const handlleClick = (name,view) => {
    console.log('btn clicked',name);
    const post = document.getElementById('postTracker');
    const divs = document.createElement('div');
    divs.innerHTML = `
    <div class="flex justify-between gap-4 px-4 py-6 rounded-2xl bg-white mt-4">
    <div class="">
        <p class="text-black text-lg lg:text-xl">${name}</p>
    </div>
    <div class="inline-flex justify-center items-center content-center gap-5">
        <span><i class="fa-regular fa-eye"></i></span>
        <p>${view}</p>
    </div>
    </div>
    
    `;
    post.appendChild(divs)

}
loadLatest();