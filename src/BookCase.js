import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Shelf from './Shelf'


class BookCase extends Component{
  static propTypes = {
    books: PropTypes.array,
    onShelfChangeHandler: PropTypes.func.isRequired,
  }

  render(){
    const { books, onShelfChangeHandler } = this.props
    const currentlyReading = books.filter(book => (book.shelf === "currentlyReading"))
    const wantToRead = books.filter(book => (book.shelf === "wantToRead"))
    const read = books.filter(book => (book.shelf === "read"))
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf name='Currently Reading' books={currentlyReading} onShelfChangeHandler={onShelfChangeHandler}/>
            <Shelf name='Want to Read' books={wantToRead} onShelfChangeHandler={onShelfChangeHandler}/>
            <Shelf name='Read' books={read} onShelfChangeHandler={onShelfChangeHandler}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a Book</Link>
        </div>
      </div>
    )
  }
}

export default BookCase