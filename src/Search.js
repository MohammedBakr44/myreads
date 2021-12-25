import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import terms from "./searchTerms";
import Book from "./Book";
const searchTerms = terms.terms;
const Search = (props) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    call(search); //BooksAPI.getAll().then((data) => addBooks([...data])));
    // displayResults();
    //setResults([...results, ...filterBooks(results, books)]);
  }, [search]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    // debounce(call(e.target.value));
  };
  // TODO
  // https://www.freecodecamp.org/news/javascript-debounce-example/
  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const call = (search) => {
    if (!search || search.length === 0) return;
    BooksAPI.search(search).then((data) => {
      try {
        setResults(
          [...data].filter((result) => result.imageLinks.smallThumbnail)
        );
      } catch (err) {
        setResults([]);
      }
    });
  };
  // https://dmitripavlutin.com/react-throttle-debounce/
  const debouncedChange = useMemo(() => debounce(handleSearchInput, 500), []);
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
            //value={search}
            placeholder="Search by title or author"
            onChange={debouncedChange}
          />
        </div>
      </div>
      {search ? (
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map((result) => (
              <li key={result.id}>
                <Book book={{ ...result }} updateBook={props.updateBook} />
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p
          style={{
            padding: "10px",
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%)",
            width: "100%",
          }}
        >
          Available search terms:[ {searchTerms.map((term) => `${term}, `)}]
        </p>
      )}
    </div>
  );
};

export default Search;
