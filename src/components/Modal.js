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

    // Закрытие модального окна при клике на изображение
    instance.element().querySelector('img').addEventListener('click', () => {
      instance.close();
      this.props.onClose();
    });

    // Закрытие модального окна при нажатии на клавишу ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        instance.close();
        this.props.onClose();
      }
    });
  }

  render() {
    return null;
  }
}

export default Modal;
