import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { getImages } from '../services/api';

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
  };

  handleLoadMore = () => {
    this.setState((prevState) => {
      const { query, page } = prevState;
      if (query.trim() !== '') {
        return { page: page + 1 };
      }
      return null;
    });
  };
  

  handleOpenModal = (imageUrl) => {
    this.setState({ showModal: true, modalImageUrl: imageUrl, isLoading: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, modalImageUrl: '', isLoading: false });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
  
    if (query !== prevState.query || page !== prevState.page) {
      if (query.trim() !== '') {
        this.setState({ isLoading: true });
  
        getImages(query, page)
          .then((data) => {
            this.setState((prevState) => ({
              images: [...prevState.images, ...data.hits],
            }));
          })
          .catch((error) => {
            console.error('Error fetching images:', error);
          })
          .finally(() => {
            this.setState({ isLoading: false });
          });
      }
    }
  }    

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
