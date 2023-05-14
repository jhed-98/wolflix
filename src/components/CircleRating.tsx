import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

interface CircleRatingProps {
    rating: any;
}

const CircleRating: React.FC<CircleRatingProps> = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    )
}

export default CircleRating
