'use strict';
import './sass/main.scss';
import API from './js/apiService';
import NOTE from './js/notifications';
import refs from './js/refs';
import imageCard from './templates/imageCard.hbs';
import * as basicLightbox from 'basiclightbox';

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
        NOTE.notCorrectRequestAlert();
        return
    }             
    API.fetchImages()
        .then(hits => {
            if (hits.length === 0) {
                refs.loadMoreImgBtn.style.display = 'none';
                NOTE.onFetchError();                
            } else if (hits.length < 12) {
                const markup = imageCard(hits);
                renderImages(markup);
                refs.loadMoreImgBtn.style.display = 'none';
                NOTE.noMoreImgRequestAlert();
            } else if (value) {
                const markup = imageCard(hits);
                renderImages(markup);
                NOTE.onSuccessfulRequest();
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
            NOTE.onFetchError();         
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
            NOTE.onFetchError();
        })
    // NOTE.onSuccessfulRequest();
};

function renderImages(markupImg) {
    refs.galleryImg.insertAdjacentHTML('beforeend', markupImg);
}

function clearImgContainer() {
    refs.galleryImg.innerHTML = '';
}

const largeImageOnClick = (e) => {
    basicLightbox.create(`<img src="${e.target.alt}">`).show(e);
}
refs.galleryImg.addEventListener('click', largeImageOnClick);
