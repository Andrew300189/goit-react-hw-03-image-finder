import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

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
    this.setState({ images: [], query, page: 1 }, () => {
      if (query.trim() !== '') {
        this.fetchImages(query, 1);
      }
    });
  };

  handleLoadMore = () => {
    const { query, page } = this.state;
    if (query.trim() !== '') {
      this.setState({ page: page + 1 }, () => {
        this.fetchImages(query, page + 1);
      });
    }
  };

  handleOpenModal = (imageUrl) => {
    this.setState({ showModal: true, modalImageUrl: imageUrl, isLoading: true });
  };
  
  handleCloseModal = () => {
    this.setState({ showModal: false, modalImageUrl: '', isLoading: false });
  };

  fetchImages = (query, page) => {
    const API_KEY = '38721909-f69e4340e26f5a05edebcf59f';
    const BASE_URL = 'https://pixabay.com/api/';
    const perPage = 12;
  
    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
  
    this.setState({ isLoading: true }); // Устанавливаем isLoading в true при начале загрузки.
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          isLoading: false, // Устанавливаем isLoading в false после завершения загрузки.
        }));
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        this.setState({ isLoading: false }); // Устанавливаем isLoading в false при возникновении ошибки.
      });
  };

  
  shouldShowLoadMoreButton = () => {
    return this.state.images.length > 0 && this.state.query.trim() !== '';
  };

  render() {
    const { images, isLoading, showModal, modalImageUrl } = this.state;

    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleOpenModal} />
        {showModal && (
          <Modal imageUrl={modalImageUrl} onClose={this.handleCloseModal} />
        )}
        {this.shouldShowLoadMoreButton() && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {isLoading && (
          <Loader
            type="Audio"
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        )}
      </div>
    );
  }
}

export default App;
