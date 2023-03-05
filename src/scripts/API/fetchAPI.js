import NewsApi from '../API/newsAPI';

const newsApi = new NewsApi();

//* Приходять списки категорій
async function getSectionList() {
  try {
    const results = await newsApi.fetchSectionList();
    results.forEach(({ section, display_name }) => {
      // Назва категорії
      // - display_name;
      // - section;
    });
  } catch (error) {
    console.log(error);
  }
}
//! ТЕСТОВИЙ ВИКЛИК ФУНКЦІЇ ДЛЯ ПЕРЕВІРКИ
// getSectionList();

//* Приходять дані популярних новин
async function getPopularNews() {
  try {
    const { num_results, results } = await newsApi.fetchPopularNews();
    // totalNews це кількість новин що прийшли
    const totalNews = num_results;
    console.log('totalNews: ', totalNews);

    // Витягуємо дані
    results.forEach(
      ({ abstract, published_date, media, section, title, url }) => {
        // Короткий опис
        // - abstract;
        // Дата публікації
        // - published_date;
        // Адреса картинки(можна міняти media[...])
        // - media[0]['media-metadata'][2].url;
        // Назва категорії
        // - section;
        // Заголовок
        // - title;
        // Посилання на оригінал статті
        // - url;
      }
    );
    console.log('results: ', results);
  } catch (error) {
    console.log(error);
  }
}
//! ТЕСТОВИЙ ВИКЛИК ФУНКЦІЇ ДЛЯ ПЕРЕВІРКИ
// getPopularNews();

//* Приходять дані новин по категорії по кліку
async function onCategoryClick(e) {
  try {
    newsApi.searchSection = 'business';

    const { num_results, results } = await newsApi.fetchOnSection();
    // totalNews це загальна кількість новин що прийшли
    const totalNews = num_results;
    // console.log('totalNews: ', totalNews);

    // Витягуємо дані
    results.forEach(
      ({ abstract, published_date, multimedia, section, title, url }) => {
        // Короткий опис
        // - abstract;
        // Дата публікації
        // - published_date;
        // Адреса картинки(можна міняти media[...])
        // - multimedia[2].url;
        // Назва категорії
        // - section;
        // Заголовок
        // - title;
        // Посилання на оригінал статті
        // - url;
      }
    );
    console.log('results: ', results);
  } catch (error) {
    console.log(error);
  }
}
//! ТЕСТОВИЙ ВИКЛИК ФУНКЦІЇ ДЛЯ ПЕРЕВІРКИ
// onCategoryClick();

//* Приходять дані за пошуковим значенням по кліку
async function onSearchInputSubmit(e) {
  // тут треба записати значення пошукового запиту
  newsApi.searchQuery = 'BMW';

  const { docs, meta } = await newsApi.fetchOnSearchQuery();
  // totalNews це загальна кількість новин що прийшли
  const totalNews = meta.hits;
  // console.log('totalNews: ', totalNews);

  // Витягуємо дані
  docs.forEach(
    ({ abstract, pub_date, multimedia, section_name, headline, web_url }) => {
      // Короткий опис
      //abstract;
      // Дата публікації
      //pub_date;
      // Назва категорії
      //section_name;
      // Заголовок
      //headline.main;
      // Посилання на оригінал статті
      //web_url;

      // Перевіряємо чи є зображення
      try {
        // Адреса картинки(можна міняти media[...])
        const urlImg = `https://www.nytimes.com/${multimedia[0].url}`;
        // console.log('urlImg: ', urlImg);
      } catch (error) {
        console.log('No img');
      }
    }
  );
  console.log('results: ', docs);
}
//! ТЕСТОВИЙ ВИКЛИК ФУНКЦІЇ ДЛЯ ПЕРЕВІРКИ
// onSearchInputSubmit();

export default function formatedDate(date) {
  const newDate = new Date(date);
  const day = String(newDate.getDate()).padStart(2, '0');
  const month = String(newDate.getMonth()+1).padStart(2, '0');
  const year = newDate.getFullYear();

  const result = `${day}/${month}/${year}`;

  return result;
}
