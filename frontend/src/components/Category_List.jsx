import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Gameloader from "../assets/Lottie/gamecontroller.json";
import Cards from "./Cards";
import { API_KEY, API_LINK } from "../constants/API";

export default function Category_List() {
  const location = useLocation();
  const { item, category } = location.state ?? { item: 0 };
  const [games, setGames] = useState([]);
  const [display, setDisplay] = useState("d-none");
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("");
  const url = `${API_LINK}/games?${API_KEY}&${category}=${item.id}`;

  const FetchData = () => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setGames(res.data.results);
        setNextPage(res.data.next);
        setDisplay("");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    FetchData();
  }, []); //!Initialize first 20 Games

  if (item === 0) {
    const navigate = useNavigate();
    navigate("/error-404");
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (nextPage !== null) {
          fetch(nextPage)
            .then((response) => response.json())
            .then((data) => {
              setGames((prevGames) => [...prevGames, ...data.results]);
              setNextPage(data.next);
            });
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
      <div
        className={`container-fluid details ${display}`}
        style={{
          backgroundImage: `url(${item.image_background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-white text-capitalize">{item.name}</h1>

        <div className="row">
          {loading ? (
            <div className="d-flex align-items-center justify-content-center vh-100">
              <div style={{ width: 400 }}>
                <Lottie animationData={Gameloader} loop={true} />
              </div>
            </div>
          ) : (
            games?.map((item, id) => <Cards item={item} key={id} />)
          )}
        </div>
      </div>
    </>
  );
}
