import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Search from "./Search";
import "./index.css";
import * as BooksAPI from "./BooksAPI";

const updateBook = (book, newShelf) => {
  BooksAPI.update(book, newShelf);
};

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App updateBook={updateBook} />}></Route>
      <Route
        path="/search"
        element={<Search updateBook={updateBook} />}
      ></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
