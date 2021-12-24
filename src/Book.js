import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
const Book = (props) => {
  const authors = props.authors || [];
  const [shelf, updateShelf] = useState(props.shelf);

  useEffect(
    () => {
      BooksAPI.update(props.id, shelf);
    },
    [shelf]
  );

  const handleShelf = (e) => {
    updateShelf(e.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${props.imageLinks.smallThumbnail}")`,
            backgroundSize: "cover",
          }}
        />
        <div className="book-shelf-changer">
          <select value={shelf} onChange={handleShelf}>
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
      <div className="book-title">{props.title}</div>
      <div className="book-authors">
        {authors.lenght > 1
          ? authors.map((author) => `${author}, `)
          : authors[0]}
      </div>
    </div>
  );
};

export default Book;
