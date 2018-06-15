import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

const BookList = ({ books, isLoading, moveBook }) => {
  const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
  const wantToRead = books.filter(book => book.shelf === 'wantToRead');
  const read = books.filter(book => book.shelf === 'read');

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf title="Currently Reading" books={currentlyReading} moveBook={moveBook} isLoading={isLoading} />
          <Bookshelf title="Want to Read" books={wantToRead} moveBook={moveBook} isLoading={isLoading} />
          <Bookshelf title="Read" books={read} moveBook={moveBook} isLoading={isLoading} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default BookList;
