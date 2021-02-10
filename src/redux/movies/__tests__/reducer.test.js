import { moviesReducer } from '../reducer'

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
        title: "Pokemon",
        year: 2000
    },
    {
        title: "Kimetsu no Yaiba",
        year: 2020
    },
    {
        title: "Digimon",
        year: 2019
    }
]

describe('Test moviesReducer', () => {
    it('Should return the initial state', () => {
        const initialState = {movies: null}
        expect(moviesReducer(undefined, {})).toEqual(initialState)
    })

    it('Should return the state in the parameter', () => {
        expect(moviesReducer(movies, {})).toEqual(movies)
    })
})