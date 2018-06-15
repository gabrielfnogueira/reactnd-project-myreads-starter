import PropTypes from 'prop-types';
import React from 'react';

const Book = ({ data, moveBook, shelf }) => {
  const imageUrl = data.imageLinks ? `url(${data.imageLinks.thumbnail})` : 'none';
  const bookShelf = data.shelf || shelf || 'none';

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: imageUrl
          }}
        />
        <div className="book-shelf-changer">
          <select onChange={event => moveBook(data, event.target.value)} value={bookShelf}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{data.title}</div>
      <div className="book-authors">{data.author}</div>
    </div>
  );
};

Book.propTypes = {
  data: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired,
  shelf: PropTypes.string
};

export default Book;
