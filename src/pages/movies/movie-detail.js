import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image, Badge, Spinner } from 'react-bootstrap'
import { MoviesApi } from '../../api/'


const DetailInfo = ({ label, value }) => {
    if(value) {
        return (
            <Row className="detail-row">
                <Col xs="6" md="4" lg="2">{ label }</Col>
                <Col className="detail-info">{ value }</Col>
            </Row>
        )
    }
    return null
}

function MovieDetail() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        let splitPathname = window.location.pathname.split('/');
        let id = splitPathname[splitPathname.length-1]
        getMovieDetail(id)
    }, [])

    const getMovieDetail = (id) => {
        let params = {
            i: id
        };
        MoviesApi.getMovieDetail(params)
        .then(async response => {
            await setData(response.data)
            setLoading(false)
        })
        .catch(err => {
            alert('Terjadi kesalahan mengambil data pemesanan')
            setLoading(false)
        })
    }

    return (
        <Container data-testid="movie_detail_container">
            { data ?
                <Row>
                    <Col xs="12" md="6" lg="4">
                        <Row>
                            <Col><Image src={ data.Poster } thumbnail /></Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="highlight-box">
                                    <Row>
                                    <Col xs="6" className="text-center">
                                        <h5><b>Rating</b></h5>
                                        <h3>{ data.imdbRating }</h3>
                                        <div>{ data.imdbVotes } users</div>
                                    </Col>
                                    <Col xs="6" className="text-center award-section">
                                        <h5><b>Awards</b></h5>
                                        <div>{ data.Awards }</div>
                                    </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <h2><strong data-testid="movie_title">{ data.Title }</strong></h2>
                        <Badge pill variant="info">{ data.Type }</Badge>
                        <div className="spacer-20"></div>
                        <DetailInfo label="Year" value={ data.Year } />
                        <DetailInfo label="Released" value={ data.Released } />
                        <DetailInfo label="Genre" value={ data.Genre } />
                        <DetailInfo label="Duration" value={ data.Runtime } />
                        <DetailInfo label="Actor" value={ data.Actors } />
                        <DetailInfo label="Writer" value={ data.Writer } />
                        <DetailInfo label="Director" value={ data.Director } />
                        <DetailInfo label="Production" value={ data.Production } />
                        <DetailInfo label="Country" value={ data.Country } />
                        <DetailInfo label="Language" value={ data.Language } />
                        <div className="spacer-30"></div>
                        <Row>
                            <Col>
                                <div><b>Synopsis</b></div>
                                <hr />
                                <div>{ data.Plot }</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            : null }
            { loading && <Spinner className="big-loading" animation="border" /> }
        </Container>
    )
}

export default MovieDetail
