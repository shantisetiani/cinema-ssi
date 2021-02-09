import React, { useState, useEffect } from 'react'
import { Row, Col, Image, Modal, Spinner } from 'react-bootstrap'
import NoImage from '../../assets/img/no-image.png'


function TableList(props) {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [image, setImage] = useState([])

    const closeModal = () => setShow(false)
    const showModal = (event) => {
        setImage(event.target.src)
        setShow(true)
    }

    useEffect(() => {
        setData(props.data)
        return () => {
            setData([])
        }
    }, [props.data])
    
    const { reference, state } = props

    return (
        <div>
            {
                data ?
                    data.map((item, index) => {
                        if(data.length === index + 1) {
                            return (
                                <Row key={item.imdbID} ref={reference}>
                                    <Col xs="4"><Image src={item.Poster !== "N/A" ? item.Poster : NoImage} thumbnail onClick={(e) => showModal(e)} /></Col>
                                    <Col>
                                        <h4><strong><a href={`movie-detail/${item.imdbID}`}>{item.Title}</a></strong></h4>
                                        <div>{item.Year}</div>
                                    </Col>
                                </Row>
                            )
                        }else {
                            return (
                                <Row key={item.imdbID}>
                                    <Col xs="4"><Image src={item.Poster !== "N/A" ? item.Poster : NoImage} thumbnail onClick={(event) => showModal(event)} /></Col>
                                    <Col>
                                        <h4><strong><a href={`movie-detail/${item.imdbID}`}>{item.Title}</a></strong></h4>
                                        <div>{item.Type}</div>
                                        <div>{item.Year}</div>
                                    </Col>
                                </Row>
                            )
                        }
                    }) : null
            }
            { state.loading && <Spinner animation="border" /> }
            { state.error && "Error..." }
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body><Image src={image} width="100%" thumbnail /></Modal.Body>
            </Modal>
        </div>
    )
}

export default TableList
