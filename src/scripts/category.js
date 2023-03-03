import axios from 'axios';

const dropdownBtn = document.querySelector(".category_btn");
const dropdownMenu = document.querySelector(".category_dropdown");
const toggleArrow = document.querySelector(".svg-icon");

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
console.log(window.innerWidth)

function getInformation(e) {
    const response = axios.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${apiKey}`)
        .then(({ data }) => {
            const categories = data.results;
            const markup = categories.reduce((acc, category) => {
                return acc += createMarkup(category);
            }, '');
            return markup;
        })
        .then(markup => {
            addMarkup(markup)
        })
};

function createMarkup(category) {
       return `<a class="dropdown-item" href="#">${category.display_name}</a>`
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
    response.then(({data}) => console.log(data.results));
}

function createButtons(category) {
    return `<button class="dropbtn">${category.display_name}</button>`
}