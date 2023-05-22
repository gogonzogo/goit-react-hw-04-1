import { useState, useEffect } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './image-gallery/ImageGallery';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { pixabayFetchImages } from 'api/pixabay-fetch';

export const App = () => {
  const [state, setState] = useState({
    searchQuery: '',
    page: 1,
    totalHits: 0,
    images: [],
    isLoading: false,
    modalOpen: false,
    modalImg: '',
    modalImgAlt: '',
    searchFail: false,
  });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setState(prevState => ({
          ...prevState,
          isLoading: true,
        }));
        const fetchedImages = await pixabayFetchImages(
          state.searchQuery,
          state.page
        );
        setState(prevState => ({
          ...prevState,
          images: [...prevState.images, ...fetchedImages.hits],
          totalHits: fetchedImages.totalHits,
          isLoading: false,
          searchFail: fetchedImages.hits.length === 0,
        }));
      } catch (error) {
        console.log('Error fetching images:', error);
      }
    };
    if (state.searchQuery && state.page !== 0) {
      fetchImages();
    }
  }, [state.searchQuery, state.page]);

  const handleSubmit = e => {
    e.preventDefault();
    const userQuery = e.currentTarget.elements.search.value.trim();
    if (!userQuery) {
      return;
    } else {
      setState(prevState => ({
        ...prevState,
        searchQuery: userQuery,
        page: 1,
        images: [],
      }));
      e.currentTarget.reset();
    }
  };

  const loadMoreImages = () => {
    setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  const handleGalleryClick = e => {
    const imgGallery = e.target.classList.contains('ImageGalleryItem-image');
    const overlay = e.target.classList.contains('overlay');
    if (overlay) {
      setState(prevState => ({
        ...prevState,
        modalOpen: false,
      }));
    } else if (imgGallery) {
      const image = e.target.dataset.value;
      const tags = e.target.getAttribute('alt');
      setState(prevState => ({
        ...prevState,
        modalOpen: true,
        modalImg: image,
        modalImgAlt: tags,
      }));
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <main>
        <ImageGallery state={state} handleGalleryClick={handleGalleryClick} />
        <Loader loading={state.isLoading} />
        <Button state={state} onClick={loadMoreImages} />
      </main>
    </>
  );
};