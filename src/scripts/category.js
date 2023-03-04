import axios from 'axios';

const dropdownBtn = document.querySelector(".category_btn");
const dropdownMenu = document.querySelector(".category_dropdown");
const toggleArrow = document.querySelector(".svg-icon");
const categoryContainer = document.querySelector(".category")
const body = document.querySelector('body');


const toggleDropdown = function () {
  dropdownMenu.classList.toggle("show");
  toggleArrow.classList.toggle("arrow");
};

dropdownBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleDropdown();
});

window.addEventListener('load', getInformation);
const apiKey = 'u4NcxmWo2uFBK0OuatwBNClB29lN33d8';


function getInformation(e) {
    const response = axios.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${apiKey}`)
        .then(({ data }) => {
            const dataObjects = data.results;
            const categoriesAll = dataObjects.map(dataObject => dataObject.display_name);

            const categoriesForLaptopBtn = dataObjects.reduce((acc,dataObject) => {
                if (dataObjects.indexOf(dataObject) <= 3) {
                    acc.push(dataObject.display_name)
                }
                return acc;
            }, []);

            const categoriesForDesktopBtn = dataObjects.reduce((acc,dataObject) => {
                if (dataObjects.indexOf(dataObject) <= 5) {
                    acc.push(dataObject.display_name)
                }
                return acc;
            }, []);

            const categoriesForLaptopList = dataObjects.reduce((acc,dataObject) => {
                if (dataObjects.indexOf(dataObject) > 3) {
                    acc.push(dataObject.display_name)
                }
                return acc;
            }, []);

             const categoriesForDesktopList = dataObjects.reduce((acc,dataObject) => {
                if (dataObjects.indexOf(dataObject) > 5) {
                    acc.push(dataObject.display_name)
                }
                return acc;
            }, []);
            if (body.clientWidth <= 320) {
            const markup = categoriesAll.reduce((acc, category) => {
                return acc += createMarkup(category);
            }, '');
            return markup;
            }
            else if (body.clientWidth > 320 & body.clientWidth <= 768) {
                const markupBtn = categoriesForLaptopBtn.reduce((acc, category) => {
                       return acc += createButtons(category);
                }, '');

                const markupList = categoriesForLaptopList.reduce((acc, category) => {
                        return acc += createMarkup(category);
                }, '');

                const markup = [markupBtn, markupList];
                return markup;
            } else {
                 const markupBtn = categoriesForDesktopBtn.reduce((acc, category) => {
                       return acc += createButtons(category);
                }, '');

                const markupList = categoriesForDesktopList.reduce((acc, category) => {
                        return acc += createMarkup(category);
                }, '');

                const markup = [markupBtn, markupList];
                return markup;
           }
        })
        .then(markup => {
            if (markup.length === 2) {
                 addButtons(markup[0]);
                addMarkup(markup[1]);
                dropdownBtn.firstChild.textContent='Others'
            } else {
                addMarkup(markup);

            }
        })
};

function createMarkup(category) {
       return `<a class="dropdown-item" href="#">${category}</a>`
}
    
function createButtons(category) {
    return `<button href="#">${category}</button>`
}


function addMarkup(markup) {
    dropdownMenu.innerHTML = `${markup}`
}

dropdownMenu.addEventListener('click', getNewsByCategory);

function getNewsByCategory(e) {
    const queryByCategory = e.target.textContent.toLowerCase();
    dropdownBtn.firstChild.textContent = e.target.textContent;
    const response = axios.get(`https://api.nytimes.com/svc/news/v3/content/nyt/${queryByCategory}.json?api-key=${apiKey}
`);
    dropdownMenu.classList.toggle("show");
      toggleArrow.classList.toggle("arrow");
}


function addButtons(markup) {
   categoryContainer.insertAdjacentHTML('afterbegin', markup)
}