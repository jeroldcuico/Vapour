import React from 'react'
import { Link } from 'react-router-dom'

export default function Category_Cards({ item, category }) {
    return (
        <>
            <div className="card card-category text-white"
                style={{
                    backgroundImage: `url(${item.image_background})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >

                
                <Link className='link text-decoration-none flex-column justify-content-center shadow-lg p-3 rounded h-100' to={`/category/${category}/${item.slug}`} state={{ item, category }}>
                    <div className="card-body">
                        <h3 className="card-title fw-bolder link-light ">{item.name}</h3>
                    </div>
                </Link>
            </div>
        </>
    )
}
