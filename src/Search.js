import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    try {
      BooksAPI.search(search).then((data) => setResults([...data]));
    } catch (err) {
      console.log(err);
    }
  }, [search]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input
            type="text"
            value={search}
            placeholder="Search by title or author"
            onChange={handleSearchInput}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results.map((result) => (
            <li key={result.id}>
              <Book {...result} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
