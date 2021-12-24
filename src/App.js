import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import Search from "./Search";
import "./App.css";

import Book from "./Book";

const BooksApp = () => {
  const [books, addBooks] = useState([]);

  useEffect(
    () => {
      BooksAPI.getAll().then((data) => addBooks([...data]));
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter((book) => book.shelf === "currentlyReading")
                    .map((book) => (
                      <li key={book.id}>
                        <Book {...book} />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter((book) => book.shelf === "wantToRead")
                    .map((book) => (
                      <li key={book.id}>
                        <Book {...book} />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books
                    .filter((book) => book.shelf === "read")
                    .map((book) => (
                      <li key={book.id}>
                        <Book {...book} />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <button>Add a book</button>
        </div>
      </div>
    </div>
  );
};

export default BooksApp;
