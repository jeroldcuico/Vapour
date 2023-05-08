import React, { useEffect, useState } from "react";
import Select from "react-select";
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
  const [selectedOption, setSelectedOption] = useState("popularity");
  const [ordering, setOrdering] = useState("popularity");
  const location = useLocation();
  const { id, slug, name } = location.state[0];
  const name_category = location.state[1];

  useEffect(() => {
    axios
      .get(
        `${GAME_API_ROOT}games?key=${APP_KEY}&${location.state[1]}=${id}&ordering=${ordering}`
      )
      .then((res) => {
        setCategory(res.data.results);
        setNextPage(res.data.next);
        document.title = name;
        setLoading(false);
      })
      .catch((error) => {
        res.send(error);
      });
  }, [ordering]);

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

  const handleOptionChange = (selectedOption) => {
    let ordering;
    switch (selectedOption.value) {
      case "name":
        ordering = "name";
        break;
      case "popularity":
        ordering = "popularity";
        break;
      case "released":
        ordering = "released";
        break;
      case "created":
        ordering = "created";
        break;
      case "updated":
        ordering = "updated";
        break;
      case "rating":
        ordering = "-rating";
        break;
      case "metacritic":
        ordering = "metacritic";
        break;
      default:
        ordering = "default";
        break;
    }
    setSelectedOption(selectedOption);
    setOrdering(selectedOption.value);
    setLoading(false);
  };

  const options = [
    { value: "rating", label: "Rating" },
    { value: "name", label: "Name" },
    { value: "popularity", label: "Popularity" },
    { value: "released", label: "Released" },
    { value: "created", label: "Created" },
    { value: "updated", label: "Updated" },
    { value: "metacritic", label: "MetaCritic" },
  ];

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
              <h1 className="text-white text-capitalize">{name}</h1>
              <div className="d-flex justify-content-end align-items-center">
                <label htmlFor="sortby" className="text-white">
                  Sort by:{" "}
                </label>
                <Select
                  id="sortby"
                  options={options}
                  value={selectedOption}
                  onChange={handleOptionChange}
                />
              </div>
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
