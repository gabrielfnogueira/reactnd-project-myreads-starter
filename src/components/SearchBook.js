import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { search } from '../utils/BooksAPI';
import Book from './Book';

class SearchBook extends Component {
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

    let books = null;

    if (wasSearched) {
      books =
        !isLoading && results.length > 0 ? (
          results.map(book => <Book key={book.id} data={book} moveBook={this.props.moveBook} />)
        ) : (
          <div className="empty-list">No books found</div>
        );
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
            <ReactLoading type="spinningBubbles" color="#2e7c31" />
          ) : (
            <ol className="books-grid">{books}</ol>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBook;
