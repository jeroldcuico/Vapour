import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Gameloader from "../assets/Lottie/gamecontroller.json";
import Category_Cards from "./Category_Cards";

export default function Developers() {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState("");

    const FetchData = () => {
        setLoading(true)
        axios
            .get(`http://localhost:8000/api/developers/`)
            .then((res) => {
                setDevelopers(res.data.results);
                setNextPage(res.data.next);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        FetchData()
    }, []); //!Initialize first 20 Games

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                if (nextPage !== null) {
                    fetch(nextPage)
                        .then((response) => response.json())
                        .then((data) => {
                            setDevelopers((prevGames) => [...prevGames, ...data.results]);
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
    }, [developers, nextPage]);

    return (
        <>
            <div className="container-fluid">
                <h1>Developers</h1>
                <div className="row">
                    {
                        (loading) ?
                            <div className="d-flex align-items-center justify-content-center vh-100">
                                <div style={{ width: 400 }}>
                                    <Lottie animationData={Gameloader} loop={true} />
                                </div>
                            </div>
                            :
                            developers?.map((item, id) => (
                                <div className="col-6 col-lg-3 my-2" key={id}>
                                    <Category_Cards item={item} category={'developers'} />
                                </div>
                            ))}
                </div>
            </div>
        </>
    );
}