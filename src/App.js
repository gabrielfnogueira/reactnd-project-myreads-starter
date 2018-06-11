import React from 'react';
import { Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import BookList from './BookList';
import { getAll, update } from './BooksAPI';
import SearchBook from './SearchBook';

class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    getAll().then(books => {
      const currentlyReadingList = [];
      const wantToReadList = [];
      const readList = [];

      books.forEach(book => {
        if (book.shelf === 'currentlyReading') {
          currentlyReadingList.push(book);
        } else if (book.shelf === 'wantToRead') {
          wantToReadList.push(book);
        } else if (book.shelf === 'read') {
          readList.push(book);
        }
      });

      this.setState({
        books: {
          currentlyReading: currentlyReadingList,
          wantToRead: wantToReadList,
          read: readList
        }
      });
    });
  };

  moveBook = (book, shelf) => {
    update(book, shelf).then(book => {
      this.fetchBooks();
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookList books={books} moveBook={this.moveBook} />} />
        <Route path="/search" render={() => <SearchBook books={books} moveBook={this.moveBook} />} />
      </div>
    );
  }
}

export default BooksApp;
