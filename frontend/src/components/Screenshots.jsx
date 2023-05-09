import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

export default function Screenshots({ gameid }) {
  const [screenshots, setscreenshots] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/games/${gameid}/screenshots`)
      .then((res) => {
        setscreenshots(res.data);
      })
      .catch((error) => {
        res.send(error);
      });
  }, []);

  return (
    <>
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
      
    </>
  );
}
