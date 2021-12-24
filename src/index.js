import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Search from "./Search";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />}></Route>
      <Route path="/search" element={<Search />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
