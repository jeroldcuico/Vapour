import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Search() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");

  useEffect(() => {
    fetch(
      `https://rawg.io/api/games?key=3f4a034d7b034f7bbea4371034a6e66d&search=${query}&ordering=popularity`
    )
      .then((response) => response.json())
      .then((data) => setResults(data.results))
      .catch((error) => console.error(error));
  }, [query]);

  return (
    <div>
      <div className="container">
        <h1 className="text-white">Results</h1>
        <div className="row">
          {results.length === 0 && "Nothing"}
          {results.map((item, id) => (
            <div className="col-6 col-lg-3 my-2" key={id}>
              <div className="flip-container">
                <div className="flip flipPreview">
                  <div
                    className="card text-white text-center flip-front"
                    style={{
                      backgroundImage: `url(${item.background_image})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="card-body d-flex flex-column justify-content-center shadow-lg p-3 rounded">
                      <h3 className="card-title fw-bolder">{item.name}</h3>
                    </div>
                  </div>
                  <div className="card text-center flip-back">
                    <div className="card-body d-flex flex-column">
                      <Link className="text-white" to={`/details/${item.slug}`}>
                        {item.name}
                      </Link>
                      <ul className="list-group my-2">
                        <li className="list-group-item">
                          Ratings: {[item.rating]}
                        </li>
                        <li className="list-group-item">
                          Top Ratings: {[item.rating_top]}
                        </li>
                        <li className="list-group-item">
                          Review Counts: {[item.reviews_count]}
                        </li>
                        <li className="list-group-item">
                          Released: {[item.released]}
                        </li>
                        <li className="list-group-item">
                          Playtime: {[item.playtime]}
                        </li>
                      </ul>
                      <div className="d-flex gap-2 align-items-center justify-content-center">
                        <a href="#" className="btn btn-sm btn-success">
                          Add to Collection
                        </a>
                        <Link
                          to={`/details/${item.slug}`}
                          state={item}
                          type="button"
                          className="btn btn-sm btn-dark"
                        >
                          Game Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
