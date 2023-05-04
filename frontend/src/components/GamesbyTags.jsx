import React, { useEffect, useState } from "react";
import { fetchGamesByTags } from "../helpers/ApiService";

export default function GamesbyTags() {
  const [taglist, settaglist] = useState([]);
  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    fetchGamesByTags((data) => {
        settaglist(data.results);
        setNextPage(data.next);
    });
  }, []); //!Initialize first 20 Games

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (nextPage !== null) {
          fetch(nextPage)
            .then((response) => response.json())
            .then((data) => {
              setGames((prevGames) => [...prevGames, ...data.results]);
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
  }, [taglist, nextPage]);

  return (
  <>
  
  
  </>);
}
