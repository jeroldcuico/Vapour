import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Lootie from "lottie-react";
import Gallery from "../assets/Lottie/gallery.json";
import { API_KEY, API_LINK } from "../constants/API";
import { Link } from "react-router-dom";

export default function Home() {
  document.title = "Welcome to Vapour";
  const [popular, setPopular] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${API_LINK}/games?${API_KEY}&dates=2023-01-01,2023-12-31&ordering=-added`
      )
      .then((res) => {
        setPopular(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div className="vh-100 d-flex items-align-center justify-content-center">
          <div style={{ width: 200 }}>
            <Lootie animationData={Gallery} loop={true} />
          </div>
        </div>
      ) : (
        <>
          <Carousel interval={3000} pause={true}>
            {popular?.map((item, index) => (
              <Carousel.Item key={index} className="h-100">
                <Carousel.Caption className="rounded-4 ps-0 p-5">
                  <h1 className="custom-caption">{item.name}</h1>
                  <div className="d-flex gap-3 align-items-center justify-content-center">
                    {
                      item.genres?.map((genre ,id) => (
                        <h3 key={id} className="text-white fw-bold">{genre.name}</h3>
                      ))
                    }
                  </div>
                  <Link className="btn btn-lg btn-info" to={`/games/${item.slug}`} state={item}>View Game Details</Link>
                </Carousel.Caption>

                <img
                  src={item.background_image}
                  className="rounded-2"
                  width={"100%"}
                  alt={`Image ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
}
