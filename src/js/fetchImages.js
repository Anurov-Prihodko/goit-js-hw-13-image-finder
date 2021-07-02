'use strict';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22328016-b5b8589f64a6d5a0340d8aa33'

function fetchImages( searchQuery, numPage ) {
    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${numPage}&per_page=12&key=${API_KEY}`)
    .then(response => response.json()) 
};

export default { fetchImages };

// Your API key: 22328016-b5b8589f64a6d5a0340d8aa33

