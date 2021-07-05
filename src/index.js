'use strict';
import './sass/main.scss';
import API from './js/apiService';
import refs from './js/refs';
import imageCard from './templates/imageCard.hbs';
import { alert, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import * as basicLightbox from 'basiclightbox';
import "basicLightbox/dist/basiclightbox.min.css";


refs.searchImgForm.addEventListener('submit', onImgSearchInput);
refs.loadMoreImgBtn.addEventListener('click', onLoadMoreImg);

function onImgSearchInput(e) {
    e.preventDefault();
    clearImgContainer();

    const input = e.currentTarget.elements.query;
    const value = input.value.trim().toLowerCase()

    API.defaultPage();
    API.request = value;

    if (!value) {
        notCorrectRequestAlert();
        return
    }             
    API.fetchImages()
        .then(hits => {
            if (hits.length === 0) {
                refs.loadMoreImgBtn.style.display = 'none';
                onFetchError();                
            } else if (hits.length < 12) {
                const markup = imageCard(hits);
                renderImages(markup);
                refs.loadMoreImgBtn.style.display = 'none';
                noMoreImgRequestAlert();
            } else if (value) {
                const markup = imageCard(hits);
                renderImages(markup);
                onSuccessfulRequest();
                refs.loadMoreImgBtn.style.backgroundColor = 'orange';
                refs.loadMoreImgBtn.style.display = 'inline-block';
                refs.loadMoreImgBtn.style.color = 'white';
                refs.loadMoreImgBtn.style.border = 'none';
                refs.loadMoreImgBtn.style.textAlign = 'center';
                refs.loadMoreImgBtn.style.padding = '12px 28px';
                refs.loadMoreImgBtn.style.fontSize = '16px';
                refs.loadMoreImgBtn.style.textDecoration = 'none';
                refs.loadMoreImgBtn.style.fontWeight = '700';
                refs.loadMoreImgBtn.style.borderRadius = '3px';
                refs.loadMoreImgBtn.style.marginBottom = '20px';
            }            
        })
        .catch(err => {
            console.log(err);
            onFetchError();         
    });
    input.value = '';
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

function notCorrectRequestAlert() {
    alert({
        text: "Please enter a correct request!"
    });
}

function noMoreImgRequestAlert() {
    alert({
        text: "Sorry, there are no more photos for your request!"
    });
}

const largeImageOnClick = (e) => {
    basicLightbox.create(`<img src="${e.target.alt}">`).show(e);
    // console.log(e.target.alt);
}

refs.galleryImg.addEventListener('click', largeImageOnClick);
