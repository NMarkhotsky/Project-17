import axios from 'axios';
// Базовий лінк
const BASE_URL = 'https://api.nytimes.com/svc/';
// Апі ключ
const KEY = 'api-key=u4NcxmWo2uFBK0OuatwBNClB29lN33d8';

export default class NewsApi {
  constructor() {
    // Для пошуку за категорією
    this.searchSection = '';
    // Для пошуку за введеним пошуковим значенням
    this.searchQuery = '';
    // Для пагінації за пошуковим словом
    this.page = 0;
    // Для пагінації
    this.offset = 0;
    // Періоди популярних новин за 1, 7 або 30 днів
    this.period = 1;
  }

  //* Функція запиту категорій
  async fetchSectionList() {
    const {
      data: { results },
    } = await axios.get(`${BASE_URL}news/v3/content/section-list.json?${KEY}`);
    // console.log(results);
    return results;
  }

  //* Функція запиту популярних новин
  async fetchPopularNews() {
    const { data } = await axios.get(
      `${BASE_URL}mostpopular/v2/viewed/${this.period}.json?${KEY}`
    );
    // console.log(data);
    return data;
  }

  //* Функція запиту новин по категорії
  async fetchOnSection() {
    const { data } = await axios.get(
      `${BASE_URL}news/v3/content/inyt/${this.searchSection}.json?offset=${this.offset}&${KEY}`
    );
    // console.log(data);
    return data;
  }

  //* Функція запиту новин по пошуковому значенню
  async fetchOnSearchQuery() {
    const {
      data: { response },
    } = await axios.get(
      `${BASE_URL}/search/v2/articlesearch.json?q=${this.searchQuery}&page=${this.page}&${KEY}`
    );
    // console.log(response);
    return response;
  }
}
