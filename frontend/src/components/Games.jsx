import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Gameloader from "../assets/Lottie/gamecontroller.json";
import Cards from "./Cards";
import { API_KEY, API_LINK } from "../constants/API";


export default function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState("");


    const [ordering, setOrdering] = useState("popularity");

    const FetchData = (sort) => {
        setLoading(true)
        axios
            .get(`${API_LINK}/games?${API_KEY}&ordering=${sort}`)

            .then((res) => {
                setGames(res.data.results);
                setNextPage(res.data.next);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        FetchData(ordering)
    }, [ordering]); //!Initialize first 20 Games

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
    }, [games, nextPage]);
    const handleOptionChange = (e) => {
        let ordering;
        switch (e.target.value) {
            case "name":
                ordering = "name";
                break;
            case "popularity":
                ordering = "-popularity";
                break;
            case "released":
                ordering = "released";
                break;
            case "created":
                ordering = "created";
                break;
            case "updated":
                ordering = "updated";
                break;
            case "rating":
                ordering = "-rating";
                break;
            case "metacritic":
                ordering = "metacritic";
                break;
            default:
                ordering = "default";
                break;
        }
        setOrdering(e.target.value);
    };

    const options = [
        { value: "rating", label: "Rating" },
        { value: "name", label: "Name" },
        { value: "popularity", label: "Popularity" },
        { value: "-released", label: "Released" },
        { value: "created", label: "Created" },
        { value: "updated", label: "Updated" },
        { value: "metacritic", label: "MetaCritic" },
    ];




    return (
        <>
            <div className="container-fluid">
                <h1 className="text-white">All Games</h1>
                <div className="d-flex justify-content-end align-items-center mb-3">
                    <label htmlFor="sortby" className="text-white">
                        Sort by:{" "}
                    </label>
                    <select value={ordering} onChange={handleOptionChange} className="form-select" style={{ width: '10rem' }}>
                        {options.map((option, id) => (
                            <option key={id} value={option.value} >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="row">
                    {
                        loading ?
                            <div className="d-flex align-items-center justify-content-center vh-100">
                                <div style={{ width: 400 }}>
                                    <Lottie animationData={Gameloader} loop={true} />
                                </div>
                            </div> :
                            games?.map((item, id) => (
                                <Cards item={item} key={id} />
                            ))}
                </div>
            </div>
        </>
    );
}