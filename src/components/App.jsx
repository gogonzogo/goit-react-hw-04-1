import React, { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './image-gallery/ImageGallery';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';
import { pixabayFetchImages } from 'api/pixabay-fetch';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    totalHits: 0,
    images: [],
    isLoading: false,
    modalOpen: false,
    modalImg: '',
    modalImgAlt: '',
    searchFail: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const userQuery = e.currentTarget.elements.search.value.trim();
    if (!userQuery) {
      return;
    } else {
      this.setState(
        {
          searchQuery: userQuery,
          page: 1,
          isLoading: true,
          searchFail: false,
        },
        async () => {
          const fetchedImages = await pixabayFetchImages(
            this.state.searchQuery,
            this.state.page
          );
          this.setState(prevState => ({
            images: fetchedImages.hits,
            totalHits: fetchedImages.totalHits,
            isLoading: false,
            searchFail: fetchedImages.hits.length === 0,
          }));
        }
      );
      e.currentTarget.reset();
    }
  }

  loadMoreImages = async (totalPages) => {
    const { page } = this.state;
    if (totalPages > page) {
      this.setState({ isLoading: true }, async () => {
        const fetchedImages = await pixabayFetchImages(
          this.state.searchQuery,
          page + 1
        );
        this.setState(prevState => ({
          page: prevState.page + 1,
          images: [...prevState.images, ...fetchedImages.hits],
          isLoading: false,
        }));
      });
    }
  };

  handleGalleryClick = e => {
    const imgGallery = e.target.classList.contains('ImageGalleryItem-image');
    const overlay = e.target.classList.contains('overlay');
    if (overlay) {
      this.setState(prevState => ({
        ...prevState,
        modalOpen: false,
      }));
      return;
    } else if (imgGallery) {
      const image = e.target.dataset.value;
      const tags = e.target.getAttribute('alt');
      this.setState(prevState => ({
        ...prevState,
        modalOpen: true,
        modalImg: image,
        modalImgAlt: tags,
      }));
    }
  };

  render = () => (
    <>
      <Searchbar onSubmit={this.handleSubmit} />
      <main>
        <ImageGallery
          state={this.state}
          handleGalleryClick={this.handleGalleryClick}
        />
        <Loader loading={this.state.isLoading} />
        <Button state={this.state} onClick={this.loadMoreImages} />
      </main>
    </>
  );
}

export default App;
