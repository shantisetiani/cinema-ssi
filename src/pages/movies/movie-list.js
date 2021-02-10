import React, { useEffect, useRef, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { MoviesApi } from '../../api/'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
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

    // Observe the last element of movie in movie list
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


    // Handle search autocomplete with timeout
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

    // Close autocomplete box if click outside the element
    const autoCompleteRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target)) {
                setShowAutocomplete(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [autoCompleteRef]);

    return (
        <Container data-testid="movie_list_container">
            <h2>Movie List</h2>
            <Row>
                <Col xs="12" sm="6" lg="4">
                    <Row>
                        <Col>
                            <Form.Control type="text"
                                className="input-search"
                                placeholder="Search a movie title"
                                ref={inputSearchRef}
                                onKeyUp={handleKeyUp}
                                data-testid="input_search"
                            />
                            { showAutocomplete ?
                                <div className="autocomplete-box" ref={autoCompleteRef}>
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
                            <Button onClick={searchMovie} data-testid="btn_Search">Search</Button>
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
