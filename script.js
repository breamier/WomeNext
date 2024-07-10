import { API_KEY }from "./apikey.js";


const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const api_url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;
fetch(api_url)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const container = document.querySelector('.articles');
                    container.innerHTML = "";
                    console.log(data.articles);
                    data.articles.forEach(article => {

                        if (article.urlToImage == null){
                            article.urlToImage = "images/alt-bg.png";
                        }

                        if(article.description == null){
                            article.description ="";
                        }

                        if (article.author == null){
                            article.author = article.source["name"];
                        }

                        const dateString = article.publishedAt;

                        const date = new Date(dateString);

                        const year = date.getFullYear();
                        const monthName = months[date.getMonth()];
                        const day = date.getDate();

                        article.publishedAt = `${monthName} ${day}, ${year}`;

                        const card = `
                                    <div class="col">
                                        <a href="${article.url}">
                                            <div class="card h-100">
                                                <img src="${article.urlToImage}" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                    <h5 class="card-title">${article.title}</h5>
                                                    <small class="text-muted">${article.author}</small>
                                                    <p class="card-text">${article.description}</p>
                                                </div>
                                                <div card="card-footer">
                                                    <small class="text-muted px-3">${article.publishedAt}</small>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                `;
                        container.innerHTML += card;
                    });

                })
                .catch(error => console.error('Error fetching data:', error));
