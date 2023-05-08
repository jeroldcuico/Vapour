import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Gameloader from "../assets/Lottie/gamecontroller.json";
import { GAME_API_ROOT, APP_KEY } from "../helpers/Api";
import { Header } from "../containers";
import Card from "./Card";

export default function Details() {
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("");
  const location = useLocation();
  const { id, slug, name } = location.state[0];
  const name_category = location.state[1];

  useEffect(() => {
    axios
      .get(`${GAME_API_ROOT}games?key=${APP_KEY}&${location.state[1]}=${id}`)
      .then((res) => {
        setCategory(res.data.results);
        setNextPage(res.data.next);
        document.title = name_category;
        setLoading(false);
      })
      .catch((error) => {
        res.send(error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (nextPage !== null) {
          fetch(nextPage)
            .then((response) => response.json())
            .then((data) => {
              setCategory((prevGames) => [...prevGames, ...data.results]);
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
  }, [category, nextPage]);

  console.log(category);

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
  const img = category.background_image || category.image_background;
  return (
    <>
      <div
        className="details"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <Header />
        <div className="container-fluid">
          <section>
            <div className="rounded-2 p-3 maskedbg">
              <h1 className="text-white">{name}</h1>
              <div className="row">
                {category?.map((item, id) => (
                  <div className="col-6 col-lg-3 my-2" key={id}>
                    <Card item={item} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
