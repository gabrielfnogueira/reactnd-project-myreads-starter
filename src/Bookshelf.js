import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {
  state = {};
  render() {
    const { title, books, moveBook } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li>
                <Book data={book} moveBook={moveBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
