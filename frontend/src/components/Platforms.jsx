import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Gameloader from "../assets/Lottie/gamecontroller.json";
import Category_Cards from "./Category_Cards";
import { API_KEY, API_LINK } from "../constants/API";

export default function Tags() {
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState("");

    const FetchData = () => {
        setLoading(true)
        axios
            .get(`${API_LINK}/platforms?${API_KEY}&page_size=20`)
            .then((res) => {
                setPlatforms(res.data.results);
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
                            setPlatforms((prevGames) => [...prevGames, ...data.results]);
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
    }, [platforms, nextPage]);

    return (
        <>
            <div className="container-fluid">
                <h1>Platforms</h1>
                <div className="row">
                    {
                        (loading) ?
                            <div className="d-flex align-items-center justify-content-center vh-100">
                                <div style={{ width: 400 }}>
                                    <Lottie animationData={Gameloader} loop={true} />
                                </div>
                            </div>
                            :
                            platforms?.map((item, id) => (
                                <Category_Cards key={id} item={item} category={'platforms'} />
                            ))}
                </div>
            </div>
        </>
    );
}