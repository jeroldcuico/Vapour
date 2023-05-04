import React, { useEffect, useState } from "react";
import { fetchGamesGenre } from "../helpers/ApiService";
import { Link } from "react-router-dom";

export default function GamesbyGenre() {
  const [genrelist, setgenrelist] = useState([]);
  useEffect(() => {
    fetchGamesGenre((data) => {
      console.log(data.results);
      setgenrelist(data.results);
    });
  }, []); //!Initialize first 20 Games

  return (
    <>
      <div className="row">
        {genrelist.map((item, id) => (
          <div className="col-md-4" key={id}>
            <div className="card mb-4 shadow-sm">
              <img alt="GameName" src={item.image_background} height={225} />
              <div className="card-header">
                <h5>{item.name}</h5>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  <p>Popular Games</p>
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
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
