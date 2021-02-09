import Movies from './movies';
import { API_URL, API_KEY } from '../config/constants';

export const configApi = ({ contentType } = {}) => {
  let params = {
    headers: {
      'Content-Type': contentType || 'application/json'
    },
  }

  return params;
}

const defaultParams = { apikey: API_KEY }
const params = { url: API_URL, config: configApi, defaultParams };
export const MoviesApi = Movies(params);
