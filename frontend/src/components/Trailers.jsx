import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Lootie from "lottie-react";
import Gallery from "../assets/Lottie/gallery.json";
import { API_KEY, API_LINK } from "../constants/API";

export default function Trailers({ gameid }) {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_LINK}/games/${gameid}/movies?${API_KEY}`)
      .then((res) => {
        setTrailers(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        res.send(error);
      });
  }, []);
  const extractedData = trailers.map((item) => item.data);
  return (
    <>
      {loading ? (
        <div className="d-flex items-align-center justify-content-center">
          <div style={{ width: 200 }}>
            <Lootie animationData={Gallery} loop={true} />
          </div>
        </div>
      ) : (
        <div className="trailers">
          {extractedData.map((trailer, index) => (
            <iframe
              key={trailer["480"]}
              src={trailer["480"]}
            />
          ))}
        </div>
      )}
    </>
  );
}
