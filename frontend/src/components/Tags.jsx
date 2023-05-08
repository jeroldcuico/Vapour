import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Gameloader from "../assets/Lottie/gamecontroller.json";
import { GAME_NODE_ROOT } from "../helpers/Api";
import Card from "./Card";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    axios
      .get(`${GAME_NODE_ROOT}/tags`)
      .then((res) => {
        console.log(res.data);
        setTags(res.data.results);
        setNextPage(res.data.next);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); //!Initialize first 20 tags

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (nextPage !== null) {
          fetch(nextPage)
            .then((response) => response.json())
            .then((data) => {
              setTags((prevGames) => [...prevGames, ...data.results]);
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
  }, [tags, nextPage]);

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
        <h1 className="text-white">All Tags</h1>
        <div className="row">
          {tags?.map((item, id) => (
            <div className="col-6 col-lg-3 my-2" key={id}>
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
