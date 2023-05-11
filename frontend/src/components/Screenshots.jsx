import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Lootie from "lottie-react";
import Gallery from "../assets/Lottie/gallery.json";
import { API_KEY, API_LINK } from "../constants/API";

export default function Screenshots({ gameid }) {
  const [screenshots, setscreenshots] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_LINK}/games/${gameid}/screenshots?${API_KEY}`)
      .then((res) => {
        setscreenshots(res.data);
        setLoading(false);
      })
      .catch((error) => {
        res.send(error);
      });
  }, []);

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
            {screenshots.results?.map((screenshot, index) => (
              <Carousel.Item key={index}>
                <img
                  src={screenshot.image}
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
