import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookCase from './BookCase'
import SearchPage from './SearchPage'
import './App.css'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  onShelfChangeHandler = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(
        () => {
          this.setState(
            (previousState) => {
              const unChangeBooks = previousState.books.filter(b => (b.id !== book.id))
              book.shelf = shelf
              return { books: unChangeBooks.concat([book]) }
            }
          )
        }
      )
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(
          () => ({ books })
        )
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookCase books={this.state.books} onShelfChangeHandler={this.onShelfChangeHandler} />)}/>
        <Route path='/search' render={() => (
          <SearchPage books={this.state.books} onShelfChangeHandler={this.onShelfChangeHandler}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
