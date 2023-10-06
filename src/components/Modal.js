import React, { Component } from 'react';
import * as basicLightbox from 'basiclightbox';

class Modal extends Component {
  componentDidMount() {
    this.showModal();
  }

  showModal = () => {
    const { imageUrl } = this.props;

    const instance = basicLightbox.create(`
      <div class="modal">
        <img src="${imageUrl}" alt="Image" />
      </div>
    `);

    instance.show();
  };

  render() {
    return null;
  }
}

export default Modal;
