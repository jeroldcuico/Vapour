import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Gameloader from "../assets/Lottie/gamecontroller.json";

export default function Category_List() {
  const location = useLocation();
  const { item, category } = location.state;
  const url = `https://api.rawg.io/api/games?key=3f4a034d7b034f7bbea4371034a6e66d&${category}=${item.id}`;
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("");

  const FetchData = () => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setGames(res.data.results);
        setNextPage(res.data.next);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    FetchData();
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
      <div className="container-fluid">
        <h1 className="text-white text-capitalize"></h1>

        <div className="row">
          {loading ? (
            <div className="d-flex align-items-center justify-content-center vh-100">
              <div style={{ width: 400 }}>
                <Lottie animationData={Gameloader} loop={true} />
              </div>
            </div>
          ) : (
            games?.map((item, id) => (
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
                        <Link
                          className="text-white"
                          to={`/details/${item.slug}`}
                        >
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
                            to={`/games/${item.slug}`}
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
            ))
          )}
        </div>
      </div>
    </>
  );
}
