import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ item }) {

  const img = item.background_image || item.image_background;
  return (
    <>
      <div className="flip-container">
        <div className="flip flipPreview">
          <div
            className="card text-white text-center flip-front"
            style={{
              backgroundImage: `url(${img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-center shadow-lg p-3 rounded">
              <h3 className="card-title fw-bolder text-capitalize">
                {item.name}
              </h3>
              <h5 className="card-title fw-bolder">({item.games_count})</h5>
            </div>
          </div>
          <div className="card text-center flip-back">
            <div className="card-body d-flex flex-column">
              <Link className="text-white" >
                {item.name}
              </Link>
              <ul className="list-group my-2">
                {item.games?.map((game, id) => (
                  <li className="list-group-item" key={id}>
                    <Link to={`/games/${game.slug}`} state={game}>
                      {game.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="d-flex gap-2 align-items-center justify-content-center">
                <Link
                  to={`/games/${item.slug}`} 
                  state={item}
                  type="button"
                  className="btn btn-sm btn-dark"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
