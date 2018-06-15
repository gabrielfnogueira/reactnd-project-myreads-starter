import PropTypes from 'prop-types';
import React from 'react';
import Book from './Book';

const Bookshelf = ({ title, books, moveBook }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <Book data={book} moveBook={moveBook} />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default Bookshelf;
