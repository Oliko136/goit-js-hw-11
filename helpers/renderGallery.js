import getRefs from "./getRefs";

const refs = getRefs();

const { galleryContainer } = refs;

export function renderGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                <div class="photo-thumb">
                <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
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
}