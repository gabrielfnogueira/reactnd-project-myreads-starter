import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { search } from '../utils/BooksAPI';
import Book from './Book';

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  state = {
    query: '',
    isLoading: false,
    results: [],
    wasSearched: false
  };

  handleInputChange = event => {
    const query = event.target.value.trim();

    if (query) {
      this.setState({ query, isLoading: true }, () => this.searchBook(query));
    } else {
      this.setState({ query, isLoading: false, results: [] });
    }
  };

  searchBook = query => {
    search(query).then(response => {
      this.setState(prevState => {
        prevState.isLoading = false;
        prevState.results = response.error ? [] : response;
        prevState.wasSearched = true;

        return prevState;
      });
    });
  };

  render() {
    const { query, isLoading, results, wasSearched } = this.state;
    let searchResult = null;

    if (wasSearched) {
      searchResult =
        !isLoading && results.length > 0 ? (
          results.map(book => {
            let shelf = null;
            const { books } = this.props;
            const bookFound = books.find(b => b.id === book.id);

            if (bookFound) {
              shelf = bookFound.shelf;
            }

            return <Book key={book.id} data={book} moveBook={this.props.moveBook} shelf={shelf} />;
          })
        ) : query ? (
          <li className="empty-list">No books found</li>
        ) : null;
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              debounceTimeout={200}
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          {isLoading ? (
            <div className="loading">
              <ReactLoading type="spinningBubbles" color="#2e7c31" />
            </div>
          ) : (
            <ol className="books-grid">{searchResult}</ol>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBook;
