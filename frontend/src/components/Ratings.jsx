import React from "react";

export default function Ratings({ data, colors }) {
  return (
    <>
      <div className="progress d-flex align-items-center" style={{ height: "3rem" }}>
        {
          data?.map((rating, i) => (
            <div
              key={i}
              className={`progress-bar ${colors[i]} bg-gradient p-3 `}
              role="progressbar"
              style={{ width: `${rating.percent * 100}%` }}
              aria-valuenow={rating.percent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="text-center">{`${rating.title}`}</div>
              <div>{rating.percent}%</div>
            </div>
          ))
        }
      </div>
    </>
  )
}
