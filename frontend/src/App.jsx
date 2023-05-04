import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import ContentArea from "./containers/ContentArea";
import GamebyDetails from "./components/GamebyDetails";
import GameCards from "./components/GameCards";
import GamesbyGenre from "./components/GamesbyGenre";
import GamesbyPublishers from "./components/GamesbyPublishers";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Error404 from "./components/Error404";
import GamesbyPlatforms from "./components/GamesbyPlatforms";
import GamesbyStores from "./components/GamesbyStores";
function App() {


  return (
    <Routes>
      <Route path="/" element={<ContentArea />}>
        <Route index element={<Home />} />
        <Route path="allgames" element={<GameCards />} />
        <Route path="trending" element={<Trending />} />
        <Route path="genre" element={<GamesbyGenre />} />
        <Route path="publishers" element={<GamesbyPublishers />} />
        <Route path="platforms" element={<GamesbyPlatforms />} />
        <Route path="stores" element={<GamesbyStores />} />
        <Route path="details/:name/:id" element={<GamebyDetails />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;
