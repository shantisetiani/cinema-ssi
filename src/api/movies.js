import axios from 'axios'

export default ({ url, config, defaultParams }) => {
  return {
    getMoviesList: params => axios.get(`${url}`, { ...config(), params: { ...defaultParams, ...params } }),
    getMovieDetail: params => axios.get(`${url}`, { ...config(), params: { ...defaultParams, ...params } }),
    searchMovie: search => axios.get(`${url}`, { ...config(),
      params: { ...defaultParams, s: search, page: 1 } 
    })
  }
}
