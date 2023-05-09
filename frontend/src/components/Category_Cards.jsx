import React from 'react'
import { Link } from 'react-router-dom'

export default function Category_Cards({ item, category }) {
    return (
        <>
            <div className="col-md-4 my-2" >
                <div className="card card-category text-white border-none p-4 "
                    style={{
                        backgroundImage: `url(${item.image_background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="category__header">
                        <Link className='link border-none text-decoration-none rounded h-100' to={`/category/${category}/${item.slug}`} state={{ item, category }}>
                            <h3 className="card-title fw-bolder link-light  ">{item.name}</h3>
                        </Link>
                    </div>
                    <div className="category__button">
                        {category === 'stores' && <button className='btn btn-sm btn-dark'> Follow</button>}
                    </div>
                    <div className="category__footer">
                        <h6>Games Counted: {item.games_count}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}
