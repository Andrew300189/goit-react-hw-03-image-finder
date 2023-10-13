import React from 'react';
import styles from './ImageGalleryItem.module.css'; // Импортируем стили

const ImageGalleryItem = ({ imageUrl, onClick }) => (
  <li className={styles.galleryItem} onClick={onClick}>
    <img
      className={styles.ImageGalleryItemImage} // Добавляем класс с вашими стилями
      src={imageUrl}
      alt=""
    />
  </li>
);

export default ImageGalleryItem;
