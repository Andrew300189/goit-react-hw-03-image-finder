import React from 'react';
import { Audio } from 'react-loader-spinner';
import './Loader.module.css';  // Импорт CSS-файла для стилизации лоадера

const Loader = () => (
  <div className="loader-container">
    <Audio
      type="Audio"
      color="green"
      height={80}
      width={80}
      radius={9}
      ariaLabel="three-dots-loading"
    />
  </div>
);

export default Loader;
