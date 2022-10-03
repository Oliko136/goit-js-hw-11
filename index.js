import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import getRefs from './helpers/getRefs';
import { FetchImagesAPI } from './helpers/fetchImages';
import { renderGallery, lightbox } from './helpers/renderGallery';
import resetGallery from './helpers/resetGallery';

const refs = getRefs();

const { form, loadMoreBtn } = refs;

const fetchImagesAPI = new FetchImagesAPI;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtn.classList.add('is-hidden');

function onSearch(e) {
    e.preventDefault();

    const inputEl = e.currentTarget.elements.searchQuery;
    fetchImagesAPI.query = inputEl.value;
    console.log(fetchImagesAPI.query);

    fetchImagesAPI.resetPage();
    fetchImagesAPI.fetchImages()
        .then(({ data: { hits, totalHits } }) => {
            if (hits.length === 0) {
                throw new Error;
            }
            if (fetchImagesAPI.query === '') {
                resetGallery();
                loadMoreBtn.classList.add('is-hidden');
                return Notiflix.Notify.warning('Please enter a keyword');
            }

            resetGallery();
            
            fetchImagesAPI.incrementPage();
            renderGallery(hits);
            loadMoreBtn.classList.remove('is-hidden');
            return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            
        }
        )
        .catch(onError);
}

function onLoadMore(e) {
    fetchImagesAPI.fetchImages().then(({ data: { totalHits, hits } }) => {
        fetchImagesAPI.incrementPage();
        renderGallery(hits);
        
        const totalPages = totalHits / fetchImagesAPI.perPage;
        console.log(totalPages);
        if (fetchImagesAPI.PAGE > totalPages) {
            loadMoreBtn.classList.add('is-hidden');
            return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
    });
    
}

function onError(error) {
    loadMoreBtn.classList.add('is-hidden');
    resetGallery();
    return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}
