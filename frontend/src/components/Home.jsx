import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Lootie from "lottie-react";
import Gallery from "../assets/Lottie/gallery.json";
import { API_KEY, API_LINK } from "../constants/API";

export default function Home() {
  document.title = 'Welcome to Vapour'
  const [popular, setPopular] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_LINK}/games?${API_KEY}&dates=2023-01-01,2023-12-31&ordering=-added`)
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
          <div className="container-fluid">
            <section>
              <Carousel interval={3000} pause={true}>
                {popular?.map((item, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={item.background_image}
                      className="rounded-2"
                      width={"100%"}
                      alt={`Image ${index}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </section>
          </div>

      }
    </>
  );
}
