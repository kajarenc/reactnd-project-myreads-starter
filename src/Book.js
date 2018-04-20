import PropTypes from 'prop-types'
import React, { Component } from 'react'


class Book extends Component{

  static propTypes = {
    title: PropTypes.string.isRequired,
    imageLinks: PropTypes.object,
    authors: PropTypes.array,
    book: PropTypes.object.isRequired,
    currentShelve: PropTypes.string.isRequired,
    onShelfChangeHandler: PropTypes.func.isRequired,
  }

  render(){
    const {title, imageLinks, authors, book, currentShelve, onShelfChangeHandler} = this.props
    const thumbnail = imageLinks && imageLinks.thumbnail
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumbnail})`
          }}></div>
          <div className="book-shelf-changer">
            <select value={currentShelve} onChange={(event) => onShelfChangeHandler(book, event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }


}

export default Book