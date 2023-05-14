import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

interface CircleRatingProps {
    rating: any;
}

const CircleRatingDetails: React.FC<CircleRatingProps> = ({ rating }) => {
    return (
        <div className="circleRating max-w-[70px] bg-gray-900 md:max-w-[90px] relative top-8 shrink-0 w-full -translate-y-[1.85rem]">
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

export default CircleRatingDetails
