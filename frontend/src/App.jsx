import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Tags,
  Games,
  Genres,
  Platforms,
  Publishers,
  Stores,
  Developers,
  Error404,
  Category_List,
  GameDetails, Search
} from "./components";
import Header from "./Navigation/Header";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/category/:category/:slug" element={<Category_List />} />
          <Route path="/games/:slug" element={<GameDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/error-404" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
