import formatedDate from './API/fetchAPI';

console.log(formatedDate);

const refs = {
  btnDateRead: document.querySelectorAll('.button__read'),
  iconReadEl: document.querySelectorAll('.icon__read'),
  sectionReadEl: document.querySelectorAll('.section_read'),
  articleContainerEl: document.querySelectorAll('.read__article__container'),
};
// console.log(refs.iconReadEl);

refs.btnDateRead.forEach(function (btn)  {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const parentEl = btn.parentElement;
    const articleContainerEl = parentEl.querySelector('.read__article__container');
    const iconReadEl = parentEl.querySelector('.icon__read');
    if (articleContainerEl.classList.contains('read__article__container--active')){
      articleContainerEl.classList.remove('read__article__container--active');
      iconReadEl.style.transform = 'rotatex(0deg)';
    } else {
      articleContainerEl.classList.add('read__article__container--active')
      iconReadEl.style.transform = 'rotatex(180deg)';
    }
  });
})
