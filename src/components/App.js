import React from 'react';
import { Route } from 'react-router-dom';
import { getAll, update } from '../utils/BooksAPI';
import './App.css';
import BookList from './BookList';
import SearchBook from './SearchBook';

class BooksApp extends React.Component {
  state = {
    books: [],
    isLoading: false
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    this.setState(prevState => ({ ...prevState, isLoading: true }));
    getAll().then(books => {
      this.setState({
        books: books,
        isLoading: false
      });
    });
  };

  moveBook = (book, shelf) => {
    update(book, shelf).then(() => {
      this.fetchBooks();
    });
  };

  render() {
    const { books, isLoading } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <BookList books={books} moveBook={this.moveBook} isLoading={isLoading} />}
        />
        <Route path="/search" render={() => <SearchBook books={books} moveBook={this.moveBook} />} />
      </div>
    );
  }
}

export default BooksApp;
