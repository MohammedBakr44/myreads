import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import "./App.css";

const BooksApp = (props) => {
  const [books, addBooks] = useState([]);

  useEffect(
    () => {
      BooksAPI.getAll().then((data) => addBooks([...data]));
      return "";
    },
    [books]
  );

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelfHeader="Currently Reading"
              shelf="currentlyReading"
              books={books}
              updateBook={props.updateBook}
            />
            <BookShelf
              shelfHeader="Want to Read"
              shelf="wantToRead"
              books={books}
              updateBook={props.updateBook}
            />
            <BookShelf
              shelfHeader="Read"
              shelf="read"
              books={books}
              updateBook={props.updateBook}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BooksApp;
