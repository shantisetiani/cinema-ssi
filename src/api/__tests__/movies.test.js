import axios from 'axios';
import { MoviesApi } from '../index'

jest.mock('axios');

const movies = [
    {
        title: "Spiderman",
        year: 2007
    },
    {
        title: "Batman",
        year: 2008
    },
    {
        title: "Superman",
        year: 2000
    },
    {
        title: "Spiderman vs Venom",
        year: 2019
    },
    {
        title: "The Amazing Spiderman",
        year: 2010
    },
]

test('Get movie list API', () => {
  const resp = {data: movies};

  axios.get.mockImplementation(() => Promise.resolve(resp))

  return MoviesApi.getMovieList().then(response => expect(response.data).toEqual(movies));
});