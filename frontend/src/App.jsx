import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.css";
import { ContentArea } from "./containers";
import {
  Home,
  Error404,
  GamebyDetails,
  Games,
  Tags,
  Search,
  Details,
  Platforms,
  Genres,
  Stores,
} from "./components";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ContentArea />}>
          <Route index element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="*" element={<Error404 />} />
        </Route>
        <Route path="/category/:category/:name" element={<Details />} />
        <Route path="/:category/:name" element={<GamebyDetails />} />
      </Routes>
    </>
  );
}

export default App;
