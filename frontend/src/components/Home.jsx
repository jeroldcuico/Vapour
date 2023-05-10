import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Lootie from "lottie-react";
import Gallery from "../assets/Lottie/gallery.json";
import { API_KEY, API_LINK } from "../constants/API";

export default function Home() {
  const [popular, setPopular] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://rawg.io/api/collections/lists/main`)
      .then((res) => {
        setPopular(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(popular);
  return (
    <>
      {
        (loading) ?
          <div className="d-flex items-align-center justify-content-center">
            <div style={{ width: 200 }}>
              <Lootie animationData={Gallery} loop={true} />
            </div>
          </div>
          :
          <Carousel interval={3000} pause={true}>
            {popular.results?.map((screenshot, index) => (
              <Carousel.Item key={index}>
                <img
                  src={screenshot.game_}
                  className="rounded-2"
                  width={"100%"}
                  alt={`Image ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>

      }
    </>
  );
}
