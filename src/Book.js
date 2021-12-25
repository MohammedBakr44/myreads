import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
const Book = (props) => {
  const authors = props.book.authors || [];
  const [shelf, updateShelf] = useState(props.book.shelf);

  useEffect(() => {
    BooksAPI.get(props.book.id).then((data) => updateShelf(data.shelf));
    return shelf;
  });

  const handleShelf = (e) => {
    updateShelf(e.target.value);
    props.updateBook(props.book, e.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${props.book.imageLinks.smallThumbnail}")`,
            backgroundSize: "cover",
          }}
        />
        <div className="book-shelf-changer">
          <select value={shelf || "none"} onChange={handleShelf}>
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
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">
        {
          // https://stackoverflow.com/questions/201724/easy-way-to-turn-javascript-array-into-comma-separated-list
          authors.length > 1 ? authors.join(", ") : authors[0]
        }
      </div>
    </div>
  );
};

export default Book;
