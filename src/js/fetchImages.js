'use strict';
const BASE_URL = 'https://pixabay.com/api';

function fetchImages({ searchQuery, numPage, myKey }) {
    return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${numPage}&per_page=12&key=${myKey}`)
    .then(response => response.json()) 
};

export default { fetchImages };

