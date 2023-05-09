import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Category_List() {
  const location = useLocation();
  const { item, category } = location.state;
  const url = `https://api.rawg.io/api/games/?key=3f4a034d7b034f7bbea4371034a6e66d&${category}=${item.id}`;
  console.log(url);

  console.log(category);
  return (
    <>
      <div
        className="details vh-100 p-5"
        style={{
          backgroundImage: `url(${item.image_background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h3 className="card-title fw-bolder link-light ">{item.name}</h3>
        <div className="row">
          {item.games?.map((game, id) => (
            <div className="col-6 col-lg-3 my-2 text-dark" key={id}>
              <div className="card">
                <div className="card-header">
                  <h3 className="text-dark">{game.name}</h3>
                </div>
                <div className="card-body">Release: {game.added}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
