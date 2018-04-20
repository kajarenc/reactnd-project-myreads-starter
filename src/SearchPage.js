import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class SearchPage extends Component {
  state = {
    query: '',
    searchResults: []
  }

  static propTypes = {
    onShelfChangeHandler: PropTypes.func.isRequired,
    books: PropTypes.array,
  }

  onShelveChangeSearchHandler = (book, shelf) => {
    this.setState(
      (previousState) => {
        const searchResultsWithUpdatedShelve = previousState.searchResults.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf
          }
          return b
        })
        return { searchResults: searchResultsWithUpdatedShelve }
      }
    )
    this.props.onShelfChangeHandler(book, shelf)
  }


  updateQuery = (query) => {
    this.setState(
      () => ({ query: query })
    )

    if (!query.trim()) {
      this.setState(
        () => ({
          searchResults: [],
        })
      )
    } else {
      BooksAPI.search(query)
        .then((data) => {
            if (data.error) {
              this.setState(
                () => ({
                  searchResults: [],
                  // query: ''
                })
              )
            } else {
              const extendedSearchResults = data.map(b => {
                b.shelf = 'none'
                const propBook = this.props.books.find(elem => (elem.id === b.id))
                if (propBook) {
                  b.shelf = propsBook.shelf
                }
                return b
              })
              this.setState(
                () => (
                  {
                    searchResults: extendedSearchResults,
                  }
                )
              )
            }
          }
        )
    }
  }


  render() {
    const { query, searchResults } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
             */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map(book => (
                <li key={book.id}>
                  <Book
                    title={book.title}
                    imageLinks={book.imageLinks}
                    authors={book.authors}
                    currentShelve={book.shelf}
                    id={book.id}
                    book={book}
                    onShelfChangeHandler={this.onShelveChangeSearchHandler}
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

export default SearchPage