import React from 'react';
import { Route } from 'react-router-dom';
import { getAll, update } from '../utils/BooksAPI';
import './App.css';
import BookList from './BookList';
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
    update(book, shelf).then(() => {
      // this.fetchBooks();

      // setting the state 'manually' is faster than making a fetch request
      const bookAtNewShelf = { ...book, shelf: shelf };

      this.setState(prevState => {
        return {
          books: {
            currentlyReading: prevState.books.currentlyReading,
            wantToRead: prevState.books.wantToRead,
            read: prevState.books.read,
            [book.shelf]: prevState.books[book.shelf].filter(b => b.id !== book.id),
            [shelf]: [...prevState.books[shelf], bookAtNewShelf]
          }
        };
      });
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