import getRefs from "./getRefs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = getRefs();

const { galleryContainer } = refs;

export var lightbox = new SimpleLightbox('.image-link', {});

export function renderGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                <div class="photo-thumb">
                <a class="image-link" href="${largeImageURL}">
                <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                </div> 
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b> ${views}
                     </p>
                    <p class="info-item">
                        <b>Comments</b> ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> ${downloads}
                    </p>
                </div>
                </div>`
    }).join('');

    galleryContainer.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();
}