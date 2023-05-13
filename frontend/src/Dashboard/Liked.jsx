import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Like(userid) {

  const [liked, setLiked] = useState(false);
  const [likedData, setlikedData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/likedgames/like",
        {
          params: {
            account_id: userid.userid,
          },
        }
      );
      const data = response.data;
      setlikedData(data);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const liked = localStorage.getItem("LikedGame");
    if(liked){
      setLiked(true)
    }
  }, [userid.userid]);

  const GameDeleteModal = ({ show, gameId, onDelete, onCancel }) => {
    const handleDelete = async () => {
      try {
        await axios.delete(
          `http://localhost:8000/likedgames/like/delete/${gameId}?account_id=${userid.userid}`
        );
        onDelete(); // Call the onDelete callback to update the page or perform any necessary actions
      } catch (error) {
        console.error("Error deleting game:", error);
      }
    };

    return (
      <Modal show={show} onHide={onCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this game you liked?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const [showModal, setShowModal] = useState(false);
  const [gameIdToDelete, setGameIdToDelete] = useState("");

  const handleDeleteGame = (gameId) => {
    setGameIdToDelete(gameId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    // Perform any cleanup or other actions before or after deletion
    setShowModal(false);
    localStorage.removeItem("LikedGame");
    setGameIdToDelete("");
    location.reload();
    // Redirect back to the page or update the game list
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setGameIdToDelete("");
  };

  return (
    <>
    <h1 className="fw-normal mb-1">Liked ({likedData?.length})</h1>
      {likedData?.map((item, index) => (
        <div key={index} className="col-md-4 my-2">
          <div
            className="card card-category text-white border-none p-4 "
            style={{
              backgroundImage: `url(${item.background_image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="category__header">
              <Link
                className="link border-none text-decoration-none rounded h-100"
                to={`/games/${item.slug}`}
              >
                <h3 className="card-title fw-bolder link-light  ">
                  {item.name}
                </h3>
              </Link>
            </div>
            <div className="category__body">
              <h6>Playing: {item.added}</h6>
              <h6>Ratings: {item.rating}</h6>
              <h6>Released: {item.released}</h6>
              <h6>
                Website:{" "}
                <Link
                  className="normal__link"
                  target="_blank"
                  to={item.website}
                >
                  Here
                </Link>{" "}
              </h6>
            </div>
            <div className="category__footer d-flex gap-3">
              <Link
                to={`/games/${item.slug}`}
                className="btn btn-primary"
                state={item}
              >
                Details
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteGame(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <GameDeleteModal
        show={showModal}
        gameId={gameIdToDelete}
        onDelete={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
