import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';
import Book from './Book';

const Bookshelf = ({ title, books, isLoading, moveBook }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {isLoading ? (
          <div className="loading">
            <ReactLoading type="spinningBubbles" color="#2e7c31" />
          </div>
        ) : (
          books.map(book => (
            <li key={book.id}>
              <Book data={book} moveBook={moveBook} />
            </li>
          ))
        )}
      </ol>
    </div>
  </div>
);

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default Bookshelf;
