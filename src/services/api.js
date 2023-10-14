
const API_KEY = '38721909-f69e4340e26f5a05edebcf59f';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 12;

export const getImages = (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
  
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching images:', error);
      throw error;
    });
};
