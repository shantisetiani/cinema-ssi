import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { MoviesApi } from '../../api/'


const DetailInfo = ({ label, value }) => {
    return (
        <Row>
            <Col xs="6" md="4" lg="2">{ label }</Col>
            <Col className="detail-info">{ value }</Col>
        </Row>
    )
}

function MovieDetail() {
    const [data, setData] = useState([])

    useEffect(() => {
        let splitPathname = window.location.pathname.split('/');
        let id = splitPathname[splitPathname.length-1]
        console.log(process.env)
        console.log("sadajsd")
        getMovieDetail(id)
    }, [])

    const getMovieDetail = (id) => {
        let params = {
            i: id
        };
        MoviesApi.getMovieDetail(params)
        .then(async response => {
            console.log(response)
            await setData(response.data)
            /* if(response !== null && response !== ""){
                paginationParams['total'] = response.data.metadata.count
                paginationParams['last_page'] = Math.ceil(paginationParams['total'] / paginationParams.limit)
                await this.setState({ data: response.data.data, params, paginationParams, tableLoading: false })
                if(res !== undefined) res(1)
            } */
        })
        .catch(err => {
            alert('Terjadi kesalahan mengambil data pemesanan')
            // this.setState({ tableLoading: false })
        })
    }

    return (
        <Container>
            <h2>Movie Detail</h2>
            { data ?
                <Row>
                    <Col xs="12" md="6" lg="4"><Image src={ data.Poster } thumbnail /></Col>
                    <Col>
                        <DetailInfo label="Title" value={ data.Title } />
                        <DetailInfo label="Year" value={ data.Year } />
                        <DetailInfo label="Type" value={ data.Type } />
                        <DetailInfo label="Genre" value={ data.Genre } />
                        <DetailInfo label="Duration" value={ data.Runtime } />
                        <DetailInfo label="Actor" value={ data.Actors } />
                        <DetailInfo label="Writer" value={ data.Writer } />
                        <DetailInfo label="Director" value={ data.Director } />
                        <DetailInfo label="Production" value={ data.Production } />
                        <DetailInfo label="Plot" value={ data.Plot } />
                        <DetailInfo label="Rating" value={ data.imdbRating } />
                        <DetailInfo label="Votes" value={ data.imdbVotes } />
                        <DetailInfo label="Awards" value={ data.Awards } />
                    </Col>
                </Row>
            : null }
        </Container>
    )
}

export default MovieDetail
