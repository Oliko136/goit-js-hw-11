export default function getRefs() {
    return {
        form: document.querySelector('#search-form'),
        galleryContainer: document.querySelector('.gallery'),
        loadMoreBtn: document.querySelector('.load-more'),
    }
}