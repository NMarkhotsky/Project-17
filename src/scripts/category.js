import axios from 'axios';
import NewsApi from '../scripts/API/newsAPI';
const newsApi = new NewsApi();
import _ from 'lodash';
import { newsAdapter, createMarkupForCard} from './card-item';
import formatedDate from './API/fetchAPI';

const refs = {
  cardList: document.querySelector('.cards__list'),
};
const dropdownBtn = document.querySelector(".category_btn");
const dropdownMenu = document.querySelector(".category_dropdown");
const toggleArrow = document.querySelector(".svg-icon");
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
}, 1000))


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
      
      if (body.clientWidth <= 320) {
            dropdownBtn.firstChild.textContent = 'Categories';       
            const markup = categoriesAll.reduce((acc, category) => {
                return acc += createMarkup(category);
            }, '');
          notDropdownBtnContainer.innerHTML = '';
          addMarkup(markup);
      }
      else if (body.clientWidth > 320 & body.clientWidth <= 768) {
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
        dropdownBtn.classList.add('category_btn-active');
        newsApi.searchSection = e.target.textContent.toLowerCase();
        newsApi.fetchOnSection().then(data => {
            console.log(data);
            const list = data.results.map(item => createMarkupForCard(newsAdapter(item)))
    .join('');

  refs.cardList.innerHTML = list;
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
        dropdownBtn.classList.add('category_btn-active');
        console.log(dropdownBtn.firstChild)
        newsApi.searchSection = e.target.textContent.toLowerCase();
        newsApi.fetchOnSection().then(data => {
            const list = data.results.map(item => createMarkupForCard(newsAdapter(item)))
    .join('');

  refs.cardList.innerHTML = list;
});
  } catch (error) {
    console.log(error);
  }
}



