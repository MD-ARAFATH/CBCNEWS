const loadCatagories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories#`;
  const res = await fetch(url);
  const data = await res.json();
  showcat(data.data.news_category);
};

loadCatagories();

const showcat = (catagories) => {
  const catContainer = document.getElementById("catContainer");

  for (const catagori of catagories) {
    let catName = catagori.category_name;
    let catId = catagori.category_id;
    const catLi = document.createElement("div");
    catLi.classList.add("mb-3");
    catLi.innerHTML = `<button  onclick="loadNews('${catagori.category_id}')" id="" class=" btn btn-light btn-sm text-decoration-none text-secondary fs-6" href="">${catName}</button>`;
    catContainer.appendChild(catLi);
  }
};

// fetch news catagory
function loadNews(catagoriId) {
  // start loader
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${catagoriId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNews(data.data));
}

// spinner function
const toggleSpinner = (isloading) => {
  const loaderSection = document.getElementById("loader");
  if (isloading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// function for show news
function showNews(newses) {
  let newsShort = newses.sort(
    (a, b) => parseFloat(b.total_view) - parseFloat(a.total_view)
  );
  console.log(newsShort);
  const mainNewsSection = document.getElementById("mainNewsSection");
  mainNewsSection.classList.remove("d-none");
  const faqSection = document.getElementById("faqSection");
  faqSection.textContent = "";
  const newsNumberField = document.getElementById("newsNumberField");
  if (newses.length == 0) {
    newsNumberField.innerText = `OPPS ! NO News found for this category`;
  } else {
    newsNumberField.innerText = `${newses.length} News found for this category`;
  }
  const newsBody = document.getElementById("newsBody");
  newsBody.textContent = "";
  newsShort.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card", "mb-3");
    newsDiv.innerHTML = `
       <div class="row g-0">
       <div class="col-md-3">
         <img src="${news.thumbnail_url}" class="img-fluid rounded-start">  
       </div>
       <div class="col-md-9 ">
         <div class="card-body m-0">
           <h5 class="fs-3 fw-bold card-title">${news.title}</h5>
           <p class="card-text mt-3">${news.details.slice(0, 300)}...</p>
           <div class=" row  d-flex justify-content-between mt-4 " >
             <div  class="col-md-3 d-flex align-items-center">
               <img class="rounded w-5 "  src="${
                 news.author.img
               }" alt="" srcset="">
               <div class="ps-3" >
                 <h4 class="  " >${
                   news.author.name == null
                     ? "No name found"
                     : news.author.name.slice(0, 13)
                 }</h4>
                 <p>12 Feb 2021</p>
               </div>
             </div>
             <div  class="col-md-3 pt-3 ">
               <h4 class="  ">👁‍🗨 ${
                 news.total_view == null ? "No info" : news.total_view
               }</h4>
             </div>
             <div  class="col-md-3 pt-3">
               <h4 class="  ">☆☆☆☆</h4>
             </div>
             <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="newsDataId('${
               news._id
             }')" class=" col-md-2 btn btn-primary h-25 mt-4 " >Full News 🡢</button>
           </div>
           
         </div>
       </div>
     </div>
       `;
    newsBody.appendChild(newsDiv);
  });
  // stop spinner
  toggleSpinner(false);
}

// creat news button
const newsBtn = document.getElementById("newsBtn");
newsBtn.addEventListener("click", function () {
  const mainNewsSection = document.getElementById("mainNewsSection");
  mainNewsSection.classList.remove("d-none");
  const faqSection = document.getElementById("faqSection");
  faqSection.textContent = "";
  console.log("newsbtn clik");
});
