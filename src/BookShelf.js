import React from "react";
import Book from "./Book";

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfHeader}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books
            .filter((book) => book.shelf === props.shelf)
            .map((book) => (
              <li key={book.id}>
                <Book book={{ ...book }} updateBook={props.updateBook} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
