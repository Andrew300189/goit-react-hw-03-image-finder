import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import * as basicLightbox from 'basiclightbox';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
  };

  apiKey = '38721909-f69e4340e26f5a05edebcf59f';

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${this.apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => console.error('Error fetching images:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSearchSubmit = (query) => {
    this.setState({ query, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = (largeImageUrl) => {
    const instance = basicLightbox.create(`
      <img src="${largeImageUrl}" alt="" />
    `);

    instance.show();
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => this.handleImageClick(image.largeImageURL)}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleLoadMore} />}
      </div>
    );
  }
}

export default App;
