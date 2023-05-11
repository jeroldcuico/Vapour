import React from 'react'
import { Link } from 'react-router-dom'

export default function Cards({ item }) {

    return (
        <>
            <div className="col-md-4 my-2 my-2">
                <div className="flip-container">
                    <div className="flip flipPreview">
                        <div
                            className="card text-white text-center flip-front"
                            style={{
                                backgroundImage: `url(${item.background_image})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                            }}
                        >
                            <div className="card-body d-flex flex-column justify-content-center shadow-lg p-3 rounded">
                                <h3 className="card-title fw-bolder">{item.name}</h3>
                                <h6 className='text-info fw-bolder'>({item.added})</h6>
                            </div>
                        </div>
                        <div className="card text-center flip-back">
                            <div className="card-body d-flex flex-column">
                                <Link className="text-white" to={`/games/${item.slug}`} state={item}>
                                    {item.name}
                                </Link>
                                <ul className="list-group my-2">
                                    <li className="list-group-item">Ratings: {[item.rating]}</li>
                                    <li className="list-group-item">
                                        Top Ratings: {[item.rating_top]}
                                    </li>
                                    <li className="list-group-item">
                                        Review Counts: {[item.reviews_count]}
                                    </li>
                                    <li className="list-group-item">Released: {[item.released]}</li>
                                    <li className="list-group-item">Playtime: {[item.playtime]}</li>
                                </ul>
                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                    <a href="#" className="btn btn-sm btn-success">
                                        Add to Collection
                                    </a>
                                    <Link
                                        to={`/games/${item.slug}`}
                                        state={item}
                                        type="button"
                                        className="btn btn-sm btn-dark"
                                    >
                                        Game Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
