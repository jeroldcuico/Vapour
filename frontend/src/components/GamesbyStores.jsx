import React, { useEffect, useState } from "react";
import { fetchGamesStore } from "../helpers/ApiService";
import { Link } from "react-router-dom";

export default function GamesbyStores() {
  const [stores, setStores] = useState([]);
  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    fetchGamesStore((data) => {
      console.log(data);
      setStores(data.results);
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
              setPublishers((prevPublishers) => [
                ...prevPublishers,
                ...data.results,
              ]);
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
  }, [stores, nextPage]);

  return (
    <>
      <h1>Stores</h1>
      <div className="row">
        {stores.map((item, id) => (
          <div className="col-md-4" key={id}>
            <div className="card mb-4 shadow-sm">
              <img
                alt="PublisherName"
                src={item.image_background}
                height={225}
              />
              <div className="card-header">
                <h5>{item.name}</h5>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  <p>Published Games</p>
                  {
                    item.games?.map((game, id) => (
                      <li key={id} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="me-auto">
                          <Link className="fs-6" to={`/details/${game.slug}/${game.id}`}>{game.name}</Link>
                        </div>
                        <span className="badge bg-dark rounded-pill">{game.added}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="card-footer text-bg-dark">
                <span>Number of Games: {item.games_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
