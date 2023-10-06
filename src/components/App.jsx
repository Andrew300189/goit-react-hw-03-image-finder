import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    modalImageUrl: '',
  };

  handleSearch = (query) => {
    
    this.setState({ images: [], query, page: 1 });
    this.fetchImages(query, 1);
  };

  handleLoadMore = () => {
    const { query, page } = this.state;
    this.setState({ page: page + 1 });
    this.fetchImages(query, page + 1);
  };

  fetchImages = (query, page) => {
    const API_KEY = '38721909-f69e4340e26f5a05edebcf59f';
    const BASE_URL = 'https://pixabay.com/api/';
    const perPage = 12;

    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {    
          this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  };

  handleOpenModal = (imageUrl) => {
    this.setState({ showModal: true, modalImageUrl: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, modalImageUrl: '' });
  };

  shouldShowLoadMoreButton = () => {
    return this.state.images.length > 0;
  };

  render() {
    const { images, isLoading, showModal, modalImageUrl } = this.state;

    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleOpenModal} />
        {isLoading && <Loader />}
        {this.shouldShowLoadMoreButton() && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal imageUrl={modalImageUrl} onCloseModal={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
