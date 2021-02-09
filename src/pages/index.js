import React, { useState, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import Header from '../layouts/header'
import TableList from '../layouts/TableList'
import useMovieSearch from '../pages/movies/useMovieSearch'
import { setMovies } from '../redux/movies/action'

import routeFactory from '../utilities/router.factory';

const mapStateToProps = (state) => ({
    movies: state.movies.movies,
});

export const MoviesContext = React.createContext({
    loading: false,
    error: false,
    lastMovieElementRef: () => null
})

function CinemaSSIApp(props, {movies}) {
    const inputSearchRef = useRef()
    const [search, setSearch] = useState()
    const [pageNumber, setPageNumber] = useState()
    
    const searchMovie = () => {
        // if(movies) setMovies([])
        setPageNumber(1)
        setSearch(inputSearchRef.current.value)
    }

    const { loading, error, hasMore } = useMovieSearch(search, pageNumber, movies)

    const observer = useRef()
    const lastMovieElementRef = useCallback((node) => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if(node) observer.current.observe(node)
    }, [loading, hasMore])

    const currLoc = props.match.path;
    const routes = routeFactory(props.routes, currLoc)

    return (
        <MoviesContext.Provider value={{loading, error, lastMovieElementRef}}>
            <Header searchMovie={searchMovie} inputSearchRef={inputSearchRef} />
            <section id="main">
                { routes }
            </section>
        </MoviesContext.Provider>
    )
}

export default connect(mapStateToProps)(CinemaSSIApp)
