import React from 'react';
import { Audio } from 'react-loader-spinner'; // Изменили импорт

const Loader = () => {
  return (
    <div className="loader">
      <Audio
        height={80}
        width={80}
        radius={9}
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ margin: 'auto' }}
        wrapperClassName="loader-wrapper"
      />
    </div>
  );
};

export default Loader;
