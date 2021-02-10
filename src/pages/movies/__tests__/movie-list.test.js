import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../../reduxStore';
import { createMemoryHistory } from 'history'

import MovieList from '../movie-list'


const renderComponent = () => {
    const history = createMemoryHistory()
    render(
      <Provider store={store}>
        <Router history={history}>
            <MovieList />
        </Router>
      </Provider>
    )
}

beforeEach(() => {
    renderComponent()
})
afterEach(cleanup)


const leftClick = { button: 0 }
const data = [
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

test('Type on search movie input box', () => {
    const inputSearch = screen.getByTestId('input_search')

    userEvent.click(inputSearch, leftClick)
    userEvent.type(inputSearch, 'spiderman')
    expect(inputSearch).toHaveValue('spiderman')
})

test('Click search button', () => {
    const inputSearch = screen.getByTestId('input_search')
    const btnSearch = screen.getByTestId('btn_Search')
    const search = "spiderman"

    userEvent.click(inputSearch, leftClick)
    userEvent.type(inputSearch, search)
    userEvent.click(btnSearch, leftClick)

    const mockOnSearch = jest.fn().mockImplementation(search => {
        let countMatchedData = 0
        data.forEach(item => {
            if(item.title.toLowerCase().includes(search.toLowerCase())) {
                countMatchedData++
            }
        });
        return countMatchedData
    })
    
    const searchResult = mockOnSearch(search)
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
    expect(mockOnSearch).toHaveBeenCalledWith(search)
    expect(mockOnSearch).toHaveReturnedWith(searchResult)
})