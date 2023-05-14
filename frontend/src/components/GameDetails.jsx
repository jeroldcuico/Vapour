import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Screenshots from "./Screenshots";
import StoreList from "./StoreList";
import Ratings from "./Ratings";
import { API_KEY, API_LINK } from "../constants/API";
import Trailers from "./Trailers";

export default function GameDetails({ userlogged }) {
  const [gamedetails, setGameDetails] = useState({});
  const location = useLocation();
  const [display, setDisplay] = useState("d-none");
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [navigateId, setnavigateId] = useState({});
  const { id } = location.state ?? { id: 0 };
  const navigate = useNavigate();
  useEffect(() => {
    if (id === 0) {
      console.log(`test`);
      navigate("/error-404");
    } else {
      axios
        .get(`${API_LINK}/games/${id}?${API_KEY}`)
        .then((res) => {
          setGameDetails(res.data);
          setDisplay("");
          document.title = res.data.name;
        })
        .catch((error) => {
          console.log(`error`);
        });
    }

    // Check if the user is already logged in using localstorage (NINJAAAAAA)
    const addedGame = JSON.parse(localStorage.getItem('addedGame'));;
    const LikedGame = JSON.parse(localStorage.getItem("LikedGame"));
    if (addedGame) {
      setAdded(true);
      setnavigateId({added :addedGame})
    }
    if (LikedGame) {
      setLiked(true);
      setnavigateId({liked : LikedGame})
    }
  
  }, [id, navigate]);


  

  if (gamedetails.id === undefined) return; //Guard Class for ID grrr
  const ratings = gamedetails.ratings;
  const updatedCollection = {
    account_logged: userlogged.username,
    account_id: userlogged.userid,
    ...gamedetails,
  };
  const handleAddCollection = async () => {
    const response = await axios.post(
      "http://localhost:8000/games/addCollection",
      updatedCollection
    );
    const data = await response.data;
    setAdded(true);
    localStorage.setItem(
      "addedGame",
      JSON.stringify({
        added: true,
        game_id: gamedetails.id,
        account_id: userlogged.userid,
      })
    );
  };

  const handleAddLike = async () => {
    const response = await axios.post(
      "http://localhost:8000/likedgames/addLike",
      updatedCollection
    );
    const data = await response.data;
    setLiked(true);
    localStorage.setItem(
      "LikedGame",
      JSON.stringify({
        added: true,
        game_id: gamedetails.id,
        account_id: userlogged.userid,
      })
    );
  };

  return (
    <>
      <div
        className={`details ${display}`}
        style={{
          backgroundImage: `url(${gamedetails.background_image})`,
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <section>
                <div className="rounded-2 p-3 maskedbg">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="gametitle p-3">
                        <h1 className="text-white">{gamedetails.name}</h1>
                        <div className="d-flex gap-2 mb-3">
                          <button className="btn btn-info">
                            <span className="fw-bold">Released: </span>
                            {gamedetails.released || "Not yet"}
                          </button>
                          <button className="btn btn-primary">
                            <span className="fw-bold">Metacritic Rating: </span>
                            {gamedetails.metacritic || "Not yet"}
                          </button>
                        </div>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic mixed styles example"
                        >
                          <button
                            type="button"
                            className={`btn border ${
                              added ? `btn-danger` : `btn-success`
                            }`}
                            onClick={handleAddCollection}
                          >
                            {added ? "Added" : "Add to Collection"}
                          </button>
                          <button
                            type="button"
                            className={`btn border ${
                              liked ? `btn-danger` : `btn-success`
                            }`}
                            onClick={handleAddLike}
                          >
                            {liked ? "Liked" : "Add to Like"}
                          </button>
                        </div>
                      </div>
                      <div className="px-3">
                        <h5>ABOUT THE GAME: </h5>
                        <p>{gamedetails.description_raw || "No data added"}</p>
                      </div>
                      <div className="px-3">
                        <h5 className="header-primary">DEVELOPERS: </h5>
                        <ul>
                          {gamedetails.developers?.map((dev, id) => (
                            <li key={id}>{dev.name}</li>
                          ))}
                        </ul>
                        <h5>WEBSITE</h5>
                        <Link
                          className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                          target="_blank"
                          to={gamedetails.website}
                        >
                          {gamedetails.name}
                        </Link>
                      </div>
                      <div className="p-3">
                        <h5>WHERE TO BUY: </h5>
                        <StoreList gameid={gamedetails.id} />
                      </div>
                      <div className="p-3">
                        <h5>PUBLISHERS: </h5>
                        <ul>
                          {gamedetails.publishers?.map((publisher, id) => (
                            <li key={id}>
                              <Link
                                key={id}
                                id={id}
                                to={`/category/tags/${publisher.slug}`}
                                state={{
                                  item: publisher,
                                  category: "publishers",
                                }}
                                className="text-white text-decoration-none"
                              >
                                {publisher.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="my-2">
                        <Screenshots gameid={gamedetails.id} />
                      </div>
                      <div className="tags py-2">
                        <h5>TAGS #</h5>
                        {gamedetails.tags?.map((tag, id) => (
                          <Link
                            key={id}
                            id={id}
                            to={`/category/tags/${tag.slug}`}
                            state={{ item: tag, category: "tags" }}
                            className="btn btn-sm btn-dark gametags border"
                          >
                            #{tag.name}
                          </Link>
                        ))}
                      </div>
                      <div className="genres py-2">
                        <h5>GENRES</h5>
                        {gamedetails.genres?.map((genres, id) => (
                          <Link
                            key={id}
                            to={`/category/genre/${genres.slug}`}
                            state={{ item: genres, category: "tags" }}
                            className="btn btn-sm btn-dark gametags border"
                          >
                            {genres.name}
                          </Link>
                        ))}
                      </div>
                      <div className="ratings py-2">
                        <h5>RATINGS</h5>
                        <Ratings
                          data={ratings}
                          colors={[
                            "bg-success",
                            "bg-warning",
                            "bg-danger",
                            "bg-info",
                          ]}
                        />
                      </div>
                      <div className="my-2">
                        <Trailers gameid={gamedetails.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
