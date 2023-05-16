import axios from "axios";
const API_KEY = '34935940-e51141ea5040bdac8cd05a4d5';

const BASE_URL = 'https://pixabay.com';

export const getImages = (query, page) => {
  return axios
    .get(
      `${BASE_URL}/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => response.data);
};