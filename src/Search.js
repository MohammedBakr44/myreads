import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import terms from "./searchTerms";
import Book from "./Book";
const searchTerms = terms.terms;
const Search = (props) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [books, addBooks] = useState([]);

  useEffect(() => {
    BooksAPI.search(search).then((data) => {
      try {
        setResults(
          [...data].filter((result) => result.imageLinks.smallThumbnail)
        );
      } catch (err) {
        setResults([]);
      }
    });
    //BooksAPI.getAll().then((data) => addBooks([...data]));
    // displayResults();
    //setResults([...results, ...filterBooks(results, books)]);
  }, [search]);

  const displayResults = () => {
    results.map((result) => console.log(result));
  };

  const filterBooks = (results, books) => {
    let arr = [];
    for (let i in results) {
      for (let j in books) {
        if (results[i].title === books[j].title && !results[i].shelf) {
          results[i].shelf = books[j].shelf;
          arr.push(results[i]);
        }
      }
    }
    return arr;
  };

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
