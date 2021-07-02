'use strict';
import './sass/main.scss';
import API from './js/apiService';
import refs from './js/refs';
import imageCard from './templates/imageCard.hbs';
import imagesList from './templates/imagesList.hbs';


refs.inputText.addEventListener('input', onImgSearchInput)
// API.fetchImages().then(e => console.log(imagesList(e)))
// console.log(refs.inputText);

function onImgSearchInput(e) {
    e.preventDefault();

    const inputText = e.target.value.trim();
    // console.log(inputText);
}



