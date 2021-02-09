import React, { useState, useEffect } from 'react'
import { MoviesApi } from '../../api/'
import { setMovies } from '../../redux/movies/action'

function useMovieSearch(search, pageNumber, movies) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [totalPage, setTotalPage] = useState()

    useEffect(async () => {
        setLoading(true)
        setError(false)

        if(search === "" || search === undefined || pageNumber >= totalPage) {
            setLoading(false)
            return
        }
        let params = {
            s: search,
            page: pageNumber
        };

        MoviesApi.getMoviesList(params)
        .then(async response => {
            if(response.data.Response === "True") {
                // console.log(movies)
                if(!movies) {
                    await setMovies(response.data.Search)
                    let totalPageTemp = response.data.totalResults / 10
                    let remain = response.data.totalResults % 10
                    if(remain > 0) totalPageTemp++
                    setTotalPage(Math.floor(totalPageTemp))
                }else {
                    await setMovies([...movies, ...response.data.Search])
                }
                setHasMore(response.data.Search.length > 0)
                setLoading(false)
            }else {
                alert(response.data.Error)
            }
        })
        .catch(err => {
            alert(err)
            setError(true)
            setLoading(false)
        })
    }, [search, pageNumber])
    return { loading, error, hasMore }
}

export default useMovieSearch
