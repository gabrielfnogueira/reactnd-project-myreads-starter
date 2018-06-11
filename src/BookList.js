import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class BookList extends Component {
  render() {
    const {
      books: { currentlyReading, wantToRead, read },
      moveBook
    } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf title="Currently Reading" books={currentlyReading} moveBook={moveBook} />
            <Bookshelf title="Want to Read" books={wantToRead} moveBook={moveBook} />
            <Bookshelf title="Read" books={read} moveBook={moveBook} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList;
