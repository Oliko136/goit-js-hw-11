import getRefs from "./getRefs";

const refs = getRefs();

const { galleryContainer } = refs;

export default function resetGallery() {
    galleryContainer.innerHTML = '';
}