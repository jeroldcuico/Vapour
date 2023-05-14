import React, { useContext } from "react";
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
  GameDetails,
  Search,
} from "./components";
import Header from "./Navigation/Header";
import Login from "./Navigation/Login";
import Profile from "./Dashboard/Profile";
import Registration from "./Navigation/Registration";
import Test from "./Test";
import { AuthContext } from "./hooks/AuthProvider";
import EditProfile from "./Dashboard/EditProfile";

function App() {
  const authContext = useContext(AuthContext);
  // Check if authContext is undefined
  if (!authContext) {
    return <div>Loading...</div>; // or display an error message
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/editprofile" element={<EditProfile userlogged={authContext} />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/test" element={<Test />} />
          <Route path="/category/:category/:slug" element={<Category_List />} />
          <Route path="/games/:slug" element={<GameDetails userlogged={authContext} />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/error-404" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
