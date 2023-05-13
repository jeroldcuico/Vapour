import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/AuthProvider";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Liked from "./Liked";


export default function Profile() {
  const { loggedIn, username, userid, message, login, logout } =
    useContext(AuthContext);
  const [collectionData, setCollectionData] = useState([]);
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/games/collection",
        {
          params: {
            account_id: userid,
          },
        }
      );
      const data = response.data;
      setCollectionData(data);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userid]);

  const GameDeleteModal = ({ show, gameId, onDelete, onCancel }) => {
    const handleDelete = async () => {
      try {
        await axios.delete(
          `http://localhost:8000/games/collection/delete/${gameId}?account_id=${userid}`
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
        <Modal.Body>Are you sure you want to delete this game?</Modal.Body>
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
    localStorage.removeItem("addedGame");
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
      {loggedIn ? (
        <>
          <div
            className="rounded-top text-white px-5"
            style={{ backgroundColor: "" }}
          >
            <div className="my-3">
              <h1>{username}</h1>
              <div className="d-flex gap-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-xl btn-danger"
                >
                  LOGOUT
                </button>
                <Link to={"/editprofile"} className="btn btn-xl btn-primary">
                  EDIT PROFILE
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body p-4 text-white">
            <section>
              <div className="details-section"  style={{backgroundColor : '#151515'}}>
                <ul className="nav nav-tabs custom-nav border border-0">
                  <li className="nav-item maskedbg rounded">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#collections"
                    >
                      Collections
                    </a>
                  </li>
                  <li className="nav-item maskedbg rounded">
                    <a className="nav-link " data-bs-toggle="tab" href="#liked">
                      Like
                    </a>
                  </li>
                </ul>
                <div className="card tab-content maskedbg border border-0 vh-100"  style={{backgroundColor : '#151515'}}>
                  <div id="collections" className="tab-pane active">
                    <div className="card-body card-body-custom">
                      <h1 className="fw-normal mb-1">Collections ({collectionData?.length})</h1>
                      {collectionData?.map((item, index) => (
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
                    </div>
                  </div>
                  <div id="liked" className="tab-pane fade">
                    <div className="card-body card-body-custom">
                        <Liked userid={userid} />
                    </div>
                  </div>
                  <div id="client-progress" className="tab-pane fade">
                    <div className="card-body card-body-custom">
                      <div className="row mb-2">
                        <h2>Client Progress</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <h1>You're not logged in! </h1>
      )}
    </>
  );
}
