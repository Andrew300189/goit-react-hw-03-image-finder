import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, onClick }) => (
  <li className={styles.galleryItem} onClick={onClick}>
    <img src={imageUrl} alt="" />
  </li>
);

export default ImageGalleryItem;

