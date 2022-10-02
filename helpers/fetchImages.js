import axios from "axios";

export class FetchImagesAPI {
    #BASE_URL;
    #KEY;
    #PARAMS;
    #PER_PAGE;

    constructor() {
        this.#BASE_URL = 'https://pixabay.com/api/';
        this.#KEY = '30297294-1e452dfa1ea91adc237806f59';
        this.#PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';
        this.#PER_PAGE = 40;
        this.PAGE = 1;
        this.searchQuery = '';
    }

    async fetchImages(searchQuery) {
        const response = await axios.get(`${this.#BASE_URL}?key=${this.#KEY}&q=${this.searchQuery}&${this.#PARAMS}&per_page=${this.#PER_PAGE}&page=${this.PAGE}`);
        return response;
    }

    incrementPage() {
        this.PAGE += 1;
    }

    resetPage() {
        this.PAGE = 1;
    }

    get perPage() {
        return this.#PER_PAGE;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}