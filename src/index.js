'use strict';
import './sass/main.scss';
import API from './js/apiService';
import refs from './js/refs';
import imageCard from './templates/imageCard.hbs';
import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

refs.searchImgForm.addEventListener('submit', onImgSearchInput);
refs.loadMoreImgBtn.addEventListener('click', onLoadMoreImg);

function onImgSearchInput(e) {
    e.preventDefault();
    clearImgContainer();

    const input = e.currentTarget.elements.query;

    API.defaultPage();
    API.request = input.value.trim().toLowerCase();  

    API.fetchImages(input.value)
        .then(hits => {
            const markup = imageCard(hits);
            renderImages(markup)
        })
        .catch(err => {
            console.log(err);
            onFetchError();
    });
    input.value = '';
    refs.loadMoreImgBtn.style.display = 'inline-block';
    refs.loadMoreImgBtn.style.backgroundColor = 'orange';
    refs.loadMoreImgBtn.style.border = 'none';
    refs.loadMoreImgBtn.style.color = 'white';
    refs.loadMoreImgBtn.style.padding = '12px 28px';
    refs.loadMoreImgBtn.style.textAlign = 'center';
    refs.loadMoreImgBtn.style.textDecoration = 'none';
    refs.loadMoreImgBtn.style.fontSize = '16px';
    refs.loadMoreImgBtn.style.borderRadius = '5px';
    refs.loadMoreImgBtn.style.fontWeight = '700';
    refs.loadMoreImgBtn.style.marginBottom = '20px';
    onSuccessfulRequest();
}

function onLoadMoreImg() {
    API.plusPage();

     API.fetchImages()
        .then(hits => {
            const markup = imageCard(hits);
            renderImages(markup)
            const element = refs.loadMoreImgBtn;
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
        }).catch(err => {
            console.log(err);
            onFetchError();
        })
    onSuccessfulRequest();
};

function renderImages(markupImg) {
    refs.galleryImg.insertAdjacentHTML('beforeend', markupImg);
}

function clearImgContainer() {
    refs.galleryImg.innerHTML = '';
}

function onSuccessfulRequest() {
    success({
        text: "Congratulations! You found the images."
    });
}

function onFetchError() {
    error({
        text: "Something went wrong! Please please try again."
    });
}



