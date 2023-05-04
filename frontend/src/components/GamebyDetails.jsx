import React, { useEffect, useState } from "react";
import { fetchData } from "../helpers/ApiService";
import { APP_KEY, GAME_DETAILS_URL_API } from "../helpers/Api";
import { useParams } from "react-router-dom";
import StoreList from "./StoreList";
export default function GamebyDetails() {
  const [gamedetails, setGameDetails] = useState({});
  const { id } = useParams()

  useEffect(() => {
    const URLwithID = `${GAME_DETAILS_URL_API}${id}?key=${APP_KEY}`

    async function fetchGamesByDetails(callback) {
      const data = await fetchData(URLwithID);
      callback(data);
    }

    fetchGamesByDetails(data => {
      setGameDetails(data)
    })
  }, []);

  return (
    <>
      <div className="container-fluid">
        <span className="badge text-bg-dark">{gamedetails.released}</span>
        <h1>{gamedetails.name}</h1>
        <img src={gamedetails.background_image} alt="Game" style={{ "width": "100%" }} />
        {gamedetails.tags?.map((tag, id) => (
          <span key={id} className="badge text-bg-primary mx-1">{tag.name}</span>
        ))
        }
        <p>{gamedetails.description_raw}</p>
        <StoreList gameid={id} />
      </div>
    </>
  )
}
