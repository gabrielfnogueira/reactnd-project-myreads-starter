import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import BookList from './BookList';
import SearchBook from './SearchBook';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookList />} />
        <Route path="/search" render={() => <SearchBook />} />
      </div>
    );
  }
}

export default BooksApp;
