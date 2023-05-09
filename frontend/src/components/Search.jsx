import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_KEY, API_LINK } from "../constants/API";
import Lottie from "lottie-react";
import Gameloader from "../assets/Lottie/tags.json";
import Cards from "./Cards";


export default function Search() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("q");

    useEffect(() => {
        fetch(
            `${API_LINK}/games?${API_KEY}&search=${query}&ordering=popularity`
        )
            .then((response) => response.json())
            .then((data) => {
                setResults(data.results)
                setLoading(false)
            })
            .catch((error) => console.error(error));
    }, [query]);

    return (
        <div>
            <div className="container-fluid">
                <h1 className="text-white">Results</h1>
                <div className="row">
                    {results.length === 0 && "Nothing"}
                    {
                        (loading) ?
                            <div className="d-flex align-items-center justify-content-center">
                                <div style={{ width: 900 }}>
                                    <Lottie animationData={Gameloader} loop={true} />
                                </div>
                            </div>
                            :
                            results.map((item, id) => (
                                <Cards item={item} key={id} />
                            ))}
                </div>
            </div>
        </div>
    );
}