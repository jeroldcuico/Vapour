import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Gameloader from "../assets/Lottie/gamecontroller.json";
import { GAME_NODE_ROOT } from "../helpers/Api";
import CategoryCard from "./CategoryCard";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    axios
      .get(`${GAME_NODE_ROOT}/genres`)
      .then((res) => {
        console.log(res.data);
        setGenres(res.data.results);
        setNextPage(res.data.next);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); //!Initialize first 20 genres

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (nextPage !== null) {
          fetch(nextPage)
            .then((response) => response.json())
            .then((data) => {
              setGenres((prevGames) => [...prevGames, ...data.results]);
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
  }, [genres, nextPage]);

  if (loading) {
    return (
      <>
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div style={{ width: 400 }}>
            <Lottie animationData={Gameloader} loop={true} />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container-fluid">
        <h1 className="text-white">All Genres</h1>
        <div className="row">
          {genres?.map((item, id) => (
            <div className="col-6 col-lg-3 my-2" key={id}>
              <CategoryCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
