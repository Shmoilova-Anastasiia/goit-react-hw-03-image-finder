import axios from "axios";
const API_KEY = '34935940-e51141ea5040bdac8cd05a4d5';

const baseURL = 'https://pixabay.com/api/';

export const getImages = async (query, page) => {
  const { data } = await axios.get(`${baseURL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`);

  return data;
};