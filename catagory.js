const loadCatagories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories#`;
  const res = await fetch(url);
  const data = await res.json();
  showcat(data.data.news_category);
};
