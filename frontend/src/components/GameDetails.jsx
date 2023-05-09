import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Screenshots from "./Screenshots";
import StoreList from "./StoreList";
import Ratings from "./Ratings";
import { API_KEY, API_LINK } from "../constants/API";

export default function GameDetails() {
    const [gamedetails, setGameDetails] = useState({});
    const location = useLocation();
    const [display, setDisplay] = useState("d-none");
    const { id } = location.state ?? { id: 0 };
    useEffect(() => {
        axios
            .get(`${API_LINK}/games/${id}?${API_KEY}`)
            .then((res) => {
                setGameDetails(res.data);
                setDisplay("");
                document.title = res.data.name;
            })
            .catch((error) => {
                console.log(`error`);
            });
    }, []);

    if (id === 0) {
        const navigate = useNavigate();
        console.log(`test`);
        navigate("/error-404");
    }
    if (gamedetails.id === undefined) return    //Guard Class for ID grrr
    const ratings = gamedetails.ratings;
    return (
        <>
            <div
                className={`details ${display}`}

                style={{
                    backgroundImage: `url(${gamedetails.background_image})`,
                }}
            >
                <div className="container-fluid">
                    <section>
                        <div className="rounded-2 p-3 maskedbg">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="gametitle p-3">
                                        <h1 className="text-white">{gamedetails.name}</h1>
                                        <button className="btn btn-info">
                                            <span className="fw-bold">Released: </span>
                                            {gamedetails.released || "Not yet"}

                                        </button>
                                    </div>
                                    <div className="px-3">
                                        <h5>ABOUT THE GAME: </h5>
                                        <p>{gamedetails.description_raw || "No data added"}</p>

                                    </div>
                                    <div className="px-3">
                                        <h5 className="header-primary">DEVELOPERS: </h5>
                                        <ul>
                                            {gamedetails.developers?.map((dev, id) => (
                                                <li key={id}>{dev.name}</li>
                                            ))}
                                        </ul>
                                        <h5>WEBSITE</h5>
                                        <Link
                                            className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                            target="_blank"

                                            to={gamedetails.website}
                                        >
                                            {gamedetails.name}
                                        </Link>
                                    </div>
                                    <div className="p-3">
                                        <h5>WHERE TO BUY: </h5>
                                        <StoreList gameid={gamedetails.id} />
                                    </div>
                                    <div className="p-3">
                                        <h5>PUBLISHERS: </h5>
                                        <ul>
                                            {gamedetails.publishers?.map((publisher, id) => (
                                                <li key={id}>
                                                    <Link
                                                        key={id}
                                                        id={id}
                                                        to={`/category/tags/${publisher.slug}`}
                                                        state={{ item: publisher, 'category': 'publishers' }}
                                                        className="text-white text-decoration-none"
                                                    >
                                                        {publisher.name}
                                                    </Link>
                                                </li>

                                            ))}
                                        </ul>
                                    </div>
                                    <div
                                        className="btn-group px-3"
                                        role="group"
                                        aria-label="Basic mixed styles example"
                                    >
                                        <button type="button" className="btn btn-success border ">
                                            Add to Collection
                                        </button>
                                        <button type="button" className="btn btn-success border">
                                            Add to Liked
                                        </button>
                                        <button type="button" className="btn btn-success border">
                                            Refer to Friend
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="my-2">
                                        <Screenshots gameid={gamedetails.id} />
                                    </div>
                                    <div className="tags py-2">
                                        <h5>TAGS #</h5>
                                        {gamedetails.tags?.map((tag, id) => (
                                            <Link
                                                key={id}
                                                id={id}
                                                to={`/category/tags/${tag.slug}`}
                                                state={{ item: tag, 'category': 'tags' }}
                                                className="btn btn-sm btn-dark gametags border"
                                            >
                                                #{tag.name}

                                            </Link>
                                        ))}
                                    </div>
                                    <div className="genres py-2">
                                        <h5>GENRES</h5>
                                        {gamedetails.genres?.map((genres, id) => (
                                            <Link
                                                key={id}
                                                to={`/category/genre/${genres.slug}`}
                                                state={{ item: genres, 'category': 'tags' }}

                                                className="btn btn-sm btn-dark gametags border"
                                            >
                                                {genres.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="ratings py-2">
                                        <h5>RATINGS</h5>
                                        <Ratings
                                            data={ratings}
                                            colors={[
                                                "bg-success",
                                                "bg-warning",
                                                "bg-danger",
                                                "bg-info",
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="details-section">
                            <ul className="nav nav-tabs custom-nav border border-0">
                                <li className="nav-item maskedbg rounded">
                                    <a
                                        className="nav-link active"
                                        data-bs-toggle="tab"
                                        href="#contact-details"
                                    >
                                        Contact Details
                                    </a>
                                </li>
                                <li className="nav-item maskedbg rounded">
                                    <a
                                        className="nav-link "
                                        data-bs-toggle="tab"
                                        href="#files-attached"
                                    >
                                        Files Attached
                                    </a>
                                </li>
                            </ul>
                            <div className="card tab-content maskedbg">
                                <div id="contact-details" className="tab-pane active">
                                    <div className="card-body">
                                        <h2>Contact Details</h2>
                                    </div>
                                </div>
                                <div id="files-attached" className="tab-pane fade">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <h2>Files Attached</h2>
                                        </div>
                                    </div>
                                </div>
                                <div id="client-progress" className="tab-pane fade">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <h2>Client Progress</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

