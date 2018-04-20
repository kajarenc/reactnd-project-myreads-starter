import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component{

  static propTypes = {
    name: PropTypes.string.isRequired,
    onShelfChangeHandler: PropTypes.func.isRequired,
    books: PropTypes.array,
  }

  render(){
    const {name, books, onShelfChangeHandler} = this.props
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map( book => (
                <li key={book.id}>
                  <Book
                    title={book.title}
                    imageLinks={book.imageLinks}
                    authors={book.authors}
                    currentShelve={book.shelf}
                    id={book.id}
                    book={book}
                    onShelfChangeHandler={onShelfChangeHandler}
                  />
                </li>
                )
              )}
            </ol>
          </div>
        </div>
    )
  }
}

export default Shelf