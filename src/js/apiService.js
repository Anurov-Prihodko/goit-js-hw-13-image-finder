'use strict';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22328016-b5b8589f64a6d5a0340d8aa33'

export default {
    numPage: 1,
    request: '',

    fetchImages(request) {
        return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.request}&page=${this.numPage}&per_page=12&key=${API_KEY}`)
            .then(resp => resp.json())
            .then(resp => resp.hits)
        this.plusPage()
    },
    get searchQuerry() {
        return this.request;
    },
    set searchQuerry(imgName) {
        this.request = imgName;
    },
    plusPage() {
        this.numPage += 1;
    },
    defaultPage() {
        this.page = 1;
    }
};

