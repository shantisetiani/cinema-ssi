import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}

describe('Rendering all page', () => {
  it('should go to Movie List page', () => {
    renderWithRouter(<App />, { route: '/Cinema-SSI/movie-list' })

    expect(screen.getByTestId('movie_list_container')).toBeInTheDocument()
  })

  it('should go to Movie Detail page', () => {
    const id = "tt3947458"
    renderWithRouter(<App />, { route: `/Cinema-SSI/movie-detail/${id}` })

    expect(screen.getByTestId('movie_detail_container')).toBeInTheDocument()
  })
})