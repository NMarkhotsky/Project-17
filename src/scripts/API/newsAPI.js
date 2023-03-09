import axios from 'axios';
// Базовий лінк
const BASE_URL = 'https://api.nytimes.com/svc/';
// Апі ключ
const KEY = 'api-key=u4NcxmWo2uFBK0OuatwBNClB29lN33d8';
const KEY1 = 'api-key=sLtf4cvcFr9o8f66KLLXb1LPw0gDwyx2';
const KEY2 = 'api-key=R59HjC2erMnURMhjtmAzlr6FunAaXg6G';

export default class NewsApi {
  constructor() {
    // Для пошуку за категорією
    this.searchSection = '';
    // Для пошуку за введеним пошуковим значенням
    this.searchQuery = '';
    this.begin_date = '';
    this.end_date = '';
    this.page = 1;
    this.offset = 0;
    // Періоди популярних новин за 1, 7 або 30 днів
    this.period = 1;
  }

  //* Функція запиту категорій
  async fetchSectionList() {
    try {
      const {
        data: { results },
      } = await axios.get(
        `${BASE_URL}news/v3/content/section-list.json?${KEY}`
      );
      // console.log(results);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //* Функція запиту популярних новин
  async fetchPopularNews() {
    try {
      const { data } = await axios.get(
        `${BASE_URL}mostpopular/v2/viewed/${this.period}.json?${KEY2}`
      );
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //* Функція запиту новин по категорії
  async fetchOnSection(offset = 0) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}news/v3/content/inyt/${this.searchSection}.json?offset=${offset}&limit=9&${KEY2}`
      );
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //* Функція запиту новин по пошуковому значенню
  async fetchOnSearchQuery(page) {
    try {
      const {
        data: { response },
      } = await axios.get(
        `${BASE_URL}/search/v2/articlesearch.json?q=${this.searchQuery}&page=${
          page || this.page
        }&${KEY2}`
      );
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchOnSearchQueryByDate() {
    const {
      data: { response },
    } = await axios.get(
      `${BASE_URL}/search/v2/articlesearch.json?q=${this.searchQuery}&begin_date=${this.begin_date}&end_date=${this.end_date}&offset=${this.offset}&page=${this.page}&${KEY}`
    );
    // console.log(response);
    return response;
  }
}
