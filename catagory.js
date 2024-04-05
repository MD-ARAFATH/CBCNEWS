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
