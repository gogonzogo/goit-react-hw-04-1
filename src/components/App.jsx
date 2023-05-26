import { useState, useEffect } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './image-gallery/ImageGallery';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { pixabayFetchImages } from 'api/pixabay-fetch';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalImgAlt, setModalImgAlt] = useState('');
  const [searchFail, setSearchFail] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const fetchedImages = await pixabayFetchImages(
          searchQuery,
          page
        );
        setImages(prevState => [...prevState, ...fetchedImages.hits]);
        setTotalHits(fetchedImages.totalHits);
        setIsLoading(false);
        setSearchFail(fetchedImages.hits.length === 0);
      } catch (error) {
        console.log('Error fetching images:', error);
      }
    };
    if (searchQuery && page !== 0) {
      fetchImages();
    }
  }, [searchQuery, page]);

  const handleSubmit = e => {
    e.preventDefault();
    const userQuery = e.currentTarget.elements.search.value.trim();
    if (!userQuery) {
      return;
    } else {
      setSearchQuery(userQuery);
      setPage(1);
      setImages([]);
      e.currentTarget.reset();
    }
  };

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  const handleGalleryClick = e => {
    const imgGallery = e.target.classList.contains('ImageGalleryItem-image');
    const overlay = e.target.classList.contains('overlay');
    if (overlay) {
      setModalOpen(false);
    } else if (imgGallery) {
      const image = e.target.dataset.value;
      const tags = e.target.getAttribute('alt');
      setModalOpen(true);
      setModalImg(image);
      setModalImgAlt(tags);
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <main>
        <ImageGallery
          state={{ searchFail, images, modalOpen, modalImg, modalImgAlt }}
          handleGalleryClick={handleGalleryClick}
        />
        <Loader loading={isLoading} />
        <Button state={{ images, page, totalHits }} onClick={loadMoreImages} />
      </main>
    </>
  );
};