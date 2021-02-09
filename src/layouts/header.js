import React, { useState, useRef } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { MoviesApi } from '../api/index'
import { MENU } from '../config/constants'


function Header(props) {
    /* const [showAutocomplete, setShowAutocomplete] = useState(false)
    const [moviesAutocomplete, setMoviesAutocomplete] = useState()

    const { searchMovie, inputSearchRef } = props

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
    } */

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Cinema SSI</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href={MENU.MOVIE_LIST}>Movie List</Nav.Link>
            </Nav>
            {/* <Form inline>
                <FormControl type="text" placeholder="Search a movie" className="mr-sm-2" ref={inputSearchRef} onKeyUp={handleKeyUp} />
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
                <Button variant="outline-info" onClick={searchMovie}>Search</Button>
            </Form> */}
        </Navbar>
    )
}

export default Header
