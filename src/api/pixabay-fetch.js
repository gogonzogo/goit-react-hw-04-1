import axios from 'axios';

const API_KEY = '34304009-b05b832d2d75edba0ab9ad9ee';
const BASE_URL = 'https://pixabay.com/api/';

export const pixabayFetchImages = async (searchQuery, page) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        page: page,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
    return []
  }
}