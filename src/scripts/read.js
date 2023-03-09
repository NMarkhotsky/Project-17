import { createMarkupForCard, getRead } from './card-item';

const refs = {
  cardsRead: document.getElementById('read__page'),
};

const readPageCards = getRead();

const listsByDate = Object.keys(readPageCards)
  .reverse()
  .map((date, i) => {
    setTimeout(() => {
      const acc = document.getElementsByClassName('accordion');
      acc[i].addEventListener('click', function () {
        /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
        this.classList.toggle('active');

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === 'flex') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'flex';
        }
      });
    }, 0);

    const list = Object.values(readPageCards[date])
      .map(item => {
        return createMarkupForCard(item);
      })
      .join('');

    const accordion = `
    <div class="read-container">
      <button class="accordion">${date}</button>
      <div class="panel">
          ${list}
      </div>
    </div>`;

    return accordion;
  })
  .join('');

refs.cardsRead.innerHTML = listsByDate;
