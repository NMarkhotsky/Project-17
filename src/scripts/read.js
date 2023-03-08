import formatedDate from './API/fetchAPI';
import NewsApi from './API/newsAPI';
import { newsAdapter, createMarkupForCard } from './card-item';

const newsApi = new NewsApi();

const refs = {
  btnDateRead: document.querySelectorAll('.button__read'),
  iconReadEl: document.querySelectorAll('.icon__read'),
  sectionReadEl: document.querySelectorAll('.section_read'),
  articleContainerEl: document.querySelectorAll('.read__article__container'),
  articleSectionList: document.querySelector('.read__article-section-list')
};

document.addEventListener("DOMContentLoaded", () => {
  newsApi.fetchPopularNews().then((data) => {
    return data.status === 'OK' ? data.results : [];
  }).then(articles => {
    if (articles.length > 0) {
      generateDateSections(articles);
    }
  });
});

function generateDateSections(articles) {
  let readedArticlesData = JSON.parse(localStorage.getItem('readedArticlesData'));

  readedArticlesData.forEach(item => {
    const articleEl = document.createElement('li');
    articleEl.setAttribute('class', 'read__article');

    const buttonReadEl = document.createElement('button');
    buttonReadEl.setAttribute('class', 'button__read');
    buttonReadEl.setAttribute('type', 'button');

    const articleContentEl = generateArticleContent(item, articles);

    buttonReadEl.innerHTML = formatedDate(item.published_date) + '<svg class="icon__read" id="arrow" role="img" height="9" width="15" viewBox="0 0 56 32" aria-hidden="true"\
    focusable="false">\
    <path fill="#000" style="fill: const(--color1, 000)"\
      d="M6.267 0l-6.267 6.089 26.667 25.911 26.667-25.911-6.267-6.089-20.4 19.779-20.4-19.779z"></path>\
    </svg>';

    articleEl.appendChild(buttonReadEl);
    articleEl.appendChild(articleContentEl);

    buttonReadEl.addEventListener('click', function (e) {
      e.preventDefault();
      const iconReadEl = articleEl.querySelector('.icon__read');
      if (articleContentEl.classList.contains('read__article__container--active')){
        articleContentEl.classList.remove('read__article__container--active');
        iconReadEl.style.transform = 'rotatex(0deg)';
      } else {
        articleContentEl.classList.add('read__article__container--active')
        iconReadEl.style.transform = 'rotatex(180deg)';
      }
    });

    refs.articleSectionList.appendChild(articleEl);
  });
}

function generateArticleContent(item, articles) {
  const articleContentEl = document.createElement('div');
  articleContentEl.setAttribute('class', 'read__article__container');

  const readedArticles = articles.filter(article => item.readedArticleIDs.indexOf(article.id.toString()) !== -1);

  articleContentEl.innerHTML = readedArticles.map(item => createMarkupForCard(newsAdapter(item))).join('');

  return articleContentEl;
}

