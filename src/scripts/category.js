import axios from 'axios';
import NewsApi from '../scripts/API/newsAPI';
const newsApi = new NewsApi();
import _, { add } from 'lodash';
// import { newsAdapter, createMarkupForCard} from './card-item';
import formatedDate from './API/fetchAPI';

const ref = {
  cardList: document.querySelector('.cards__list'),
};

const dropdownBtn = document.querySelector(".category_btn");
const dropdownMenu = document.querySelector(".category_dropdown");
const toggleArrow = document.querySelector(".category_svg_icon");
const categoryContainer = document.querySelector(".category");
const notDropdownBtnContainer = document.querySelector('.category_notdropdownbtn_container');
const body = document.querySelector('body');
const nonDropdownBtn = document.querySelectorAll('.category_nondropdown_btn')
const toggleDropdown = function () {
  dropdownMenu.classList.toggle("show");
  toggleArrow.classList.toggle("arrow");
};

dropdownBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleDropdown();
});

window.addEventListener('load', getSectionList);
window.addEventListener('resize', _.debounce(() => {
    getSectionList()
}, 300))


async function getSectionList(e) {
  try {
      const results = await newsApi.fetchSectionList();
    const categoriesAll = results.map(({section, display_name }) => {
     return display_name
    });
      const categoriesForLaptopBtn = results.reduce((acc,result) => {
                if (results.indexOf(result) <= 3) {
                    acc.push(result.display_name)
                }
                return acc;
      }, []);


      const categoriesForDesktopBtn = results.reduce((acc,result) => {
                if (results.indexOf(result) <= 5) {
                    acc.push(result.display_name)
                }
                return acc;
      }, []);
      

      const categoriesForLaptopList = results.reduce((acc,result) => {
                if (results.indexOf(result) > 3) {
                    acc.push(result.display_name)
                }
                return acc;
      }, []);
      
      const categoriesForDesktopList = results.reduce((acc,result) => {
                if (results.indexOf(result) > 5) {
                    acc.push(result.display_name)
                }
                return acc;
      }, []);
      
      if (body.clientWidth <= 767) {
            dropdownBtn.firstChild.textContent = 'Categories';       
            const markup = categoriesAll.reduce((acc, category) => {
                return acc += createMarkup(category);
            }, '');
          notDropdownBtnContainer.innerHTML = '';
          addMarkup(markup);
      }
      else if (body.clientWidth > 767 & body.clientWidth <= 1279) {
          dropdownBtn.firstChild.textContent = 'Others';
          const markupBtn = categoriesForLaptopBtn.reduce((acc, category) => {
                       return acc += createButtons(category);
                }, '');
                addButtons(markupBtn);

                const markupList = categoriesForLaptopList.reduce((acc, category) => {
                        return acc += createMarkup(category);
                }, '');

                addMarkup(markupList);
      }
      else {
                    dropdownBtn.firstChild.textContent = 'Others';       
          const markupBtn = categoriesForDesktopBtn.reduce((acc, category) => {
                       return acc += createButtons(category);
                }, '');
                                    addButtons(markupBtn);
                const markupList = categoriesForDesktopList.reduce((acc, category) => {
                        return acc += createMarkup(category);
                }, '');
                          addMarkup(markupList);
      }
      
      
  } catch (error) {
  }
}

function createMarkup(category) {
       return `<a class="category_dropdown_item" href="#">${category}</a>`
}
    
function createButtons(category) {
    return `<button class="category_btn category_nondropdown_btn" href="#">${category}</button>`
}

function addMarkup(markup) {
    dropdownMenu.innerHTML = `${markup}`
}

function addButtons(markup) {
    notDropdownBtnContainer.innerHTML = `${markup}`
}

dropdownMenu.addEventListener('click', onCategoryClick);
notDropdownBtnContainer.addEventListener('click', onClick);

async function onClick(e) {
  try {
    clearActiveBtn();
    toggleArrow.style.fill = '#4440F7';
      addActiveBtn(e.target);
        newsApi.searchSection = e.target.textContent.toLowerCase();
    newsApi.fetchOnSection().then(data => {
      if (data.results === null) {
        const img = new URL('../img/not-found-desktop.jpg', import.meta.url);
        const markupWithNotFoundImg = `<img src="${img}" alt="We not found news at your request">`;
        ref.cardList.innerHTML = markupWithNotFoundImg;
      } else {
        const list = data.results.map(item => createMarkupForCard(newsAdapter(item)))
          .join('');

        ref.cardList.innerHTML = list;
      }
});
  } catch (error) {
    console.log(error);
  }
}


async function onCategoryClick(e) {
    try {
    dropdownBtn.firstChild.textContent = e.target.textContent; 
    dropdownMenu.classList.toggle("show");
      toggleArrow.classList.toggle("arrow");
          toggleArrow.style.fill = '#FFFFFF';
      clearActiveBtn();
      addActiveBtn(dropdownBtn);
      newsApi.searchSection = e.target.textContent.toLowerCase();
      newsApi.fetchOnSection().then(data => {
        if (data.results === null) {
          const img = new URL('../img/not-found-desktop.jpg', import.meta.url);
          const markupWithNotFoundImg = `<img src="${img}" alt="We not found news at your request">`;
          ref.cardList.innerHTML = markupWithNotFoundImg;
        } else {
          const list = data.results.map(item => createMarkupForCard(newsAdapter(item)))
            .join('');

          ref.cardList.innerHTML = list;
        }
});
        
  } catch (error) {
    console.log(error);
  }
}

const refs = {
  iconSvg: new URL('../img/symbol-defs.svg', import.meta.url),
};

export function getFavorite() {
  const favorite = JSON.parse(localStorage.getItem('favorite')) || {};

  return favorite;
}

function createSvgIcon(name) {
  return `
    <svg class="button__icon-svg">
      <use href="${refs.iconSvg}#${name}"></use>
    </svg>
  `;
}

const addFavoriteBtnHTML = `Add to favorite ${createSvgIcon('icon-heart')}`;
const removeFavoriteBtnHTML = `Remove from favorite ${createSvgIcon(
  'icon-heart-full'
)}`;

export function createMarkupForCard(news) {
  const {
    abstract,
    published_date,
    section,
    title,
    url,
    imageUrl,
    imageCaption,
    id,
  } = news;

  setTimeout(() => {
    const btn = document.querySelector(`.button__add-favorite--${id}`);
    btn.onclick = handleFavorite(id, news, btn);
  }, 0);

  const handleFavorite = (newsId, data, btn) => () => {
    btn.classList.toggle('button__add-favorite--active');
    if (btn.classList.contains('button__add-favorite--active')) {
      btn.innerHTML = removeFavoriteBtnHTML;
    } else {
      btn.innerHTML = addFavoriteBtnHTML;
    }
    const favorite = getFavorite();

    const saveFavorite = {
      [newsId]: data,
    };

    const newFavorite = { ...favorite, ...saveFavorite };

    localStorage.setItem('favorite', JSON.stringify(newFavorite));
  };

  return `
  <div class="card_item">
    <div class="card_item-header">
      <img class="card_item-image" src="${imageUrl}" alt="${imageCaption}" loading="lazy" />
      <span class="card_item-section">${section}</span>
      <button class="button__add-favorite ${`button__add-favorite--${id}`}" data-id="${id}">
        ${addFavoriteBtnHTML}
      </button>
    </div>
    <div class="cart_item-content">
      <div class="card_item-text">
        <h1 class="card_item-title">${title}</h1>
        <p class="card_item-description">${abstract}</p>
      </div>
      <div class="card_item-info">
        <span class="card_item-date">${formatedDate(published_date)}</span>
        <a class="card__link-btn" href="${url}" data-title="${title}">
          <button class="button__read-more">
            Read more
          </button>
        </a>
      </div>
    </div>
  </div>
  `;
}

export function newsAdapter(item) {
  const { abstract, published_date, section, title, url, multimedia, id } = item;
  let imageUrl = 'https://via.placeholder.com/300x200';
  let imageCaption = 'No image';
  if (multimedia.length > 0) {
      imageUrl = multimedia[2].url;
  }

  return {
    abstract,
    published_date,
    section,
    title,
    url,
    imageUrl,
    imageCaption,
    id,
  };
}

function clearActiveBtn() {
  const allBtns = document.querySelectorAll('.category_btn-active');
  if (allBtns.length !== 0) {
    allBtns.forEach((btn) => btn.classList.remove('category_btn-active'))
  }
}

function addActiveBtn(btn) {
  btn.classList.add('category_btn-active');
}

