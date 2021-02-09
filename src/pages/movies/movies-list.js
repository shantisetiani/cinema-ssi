import React, { useEffect, useRef, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { MoviesApi } from '../../api/'
import { Container, Row, Col, Form, Button, Image, Modal } from 'react-bootstrap'
import TableList from '../../layouts/TableList'
import useMovieSearch from './useMovieSearch'
import { setMovies } from '../../redux/movies/action'

const mapStateToProps = (state) => ({
    movies: state.movies.movies,
});

function MoviesList({ movies }) {
    const inputSearchRef = useRef()
    const [search, setSearch] = useState()
    const [pageNumber, setPageNumber] = useState()
    const [showAutocomplete, setShowAutocomplete] = useState(false)
    const [moviesAutocomplete, setMoviesAutocomplete] = useState()

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
    
    const searchMovie = () => {
        if(movies) setMovies([])
        setPageNumber(1)
        setSearch(inputSearchRef.current.value)
    }

    let timeout;
    const handleKeyUp = (e) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    
        async function fake() {
            MoviesApi.searchMovie(e.target.value)
            .then(async response => {
                if(response.data.Response === "True") {
                    setMoviesAutocomplete(response.data.Search)
                    setShowAutocomplete(true)
                }
            })
            .catch(err => {
                alert(err)
            })
        }
    
        timeout = setTimeout(fake, 500);
    }

    const handleClickAutocomplete = (e) => {
        inputSearchRef.current.value = e.target.textContent
        setShowAutocomplete(false)
    }

    return (
        <Container>
            <h2>Movie List</h2>
            <Row>
                <Col xs="12" sm="6" lg="4">
                    <Row>
                        <Col>
                            <Form.Control type="input" placeholder="Search a movie title" ref={inputSearchRef} onKeyUp={handleKeyUp} />
                            { showAutocomplete ?
                                <div className="autocomplete-box">
                                    { moviesAutocomplete ?
                                        moviesAutocomplete.map((item) => (
                                            <div key={item.imdbID}>
                                                <div onClick={handleClickAutocomplete}>{item.Title}</div>
                                            </div>
                                        )) : null }
                                </div>
                            : null }
                        </Col>
                        <Col>
                            <Button onClick={searchMovie}>Search</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TableList data={movies} reference={lastMovieElementRef} state={{loading,error}} />
                </Col>
            </Row>
        </Container>
    )
}

export default connect(mapStateToProps)(MoviesList)
