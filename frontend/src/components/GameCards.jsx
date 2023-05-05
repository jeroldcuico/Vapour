import React, { useEffect, useState } from "react";
import { fetchGames } from "../helpers/ApiService";
import { Link } from "react-router-dom";

export default function GameCards() {
  const [games, setGames] = useState([]);
  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    fetchGames((data) => {
      console.log(data);
      setGames(data.results);
      setNextPage(data.next);
    });
  }, []); //!Initialize first 20 Games

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (nextPage !== null) {
          fetch(nextPage)
            .then((response) => response.json())
            .then((data) => {
              setGames((prevGames) => [...prevGames, ...data.results]);
              setNextPage(data.next);
            })
            .catch((error) => console.error(error));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [games, nextPage]);

  return (
    <>
      <h1>All Games</h1>
      <div className="row">
        {games.map((item, id) => (
          <div className="col-md-4" key={id}>
            <div className="card mb-4 shadow-sm">
              <img alt="GameName" src={item.background_image} height={225} />
              <div className="card-header">
                <h2>{item.name}</h2>
              </div>
              <div className="card-body">
                <ul className="card-text">
                  <li>Ratings: {[item.rating]}</li>
                  <li>Top Ratings: {[item.rating_top]}</li>
                  <li>Review Counts: {[item.reviews_count]}</li>
                  <li>Released: {[item.released]}</li>
                  <li>Playtime: {[item.playtime]}</li>
                </ul>
                <div className="d-flex justify-content-between align-items-center"></div>
              </div>
              <div className="card-footer">
                <div className="btn-group">
                  <Link
                    to={`/details/${item.slug}/${item.id}`}
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Game Details
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Favorite
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
