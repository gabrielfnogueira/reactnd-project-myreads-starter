import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ data, moveBook }) => {
  const imageUrl = data.imageLinks ? `url(${data.imageLinks.thumbnail})` : 'none';

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
          <select onChange={event => moveBook(data, event.target.value)} value={data.shelf || 'none'}>
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
  moveBook: PropTypes.func.isRequired
};

export default Book;
