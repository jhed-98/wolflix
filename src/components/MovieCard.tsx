import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CircleRating from './CircleRating';
import Genres from './Genres';
import Img from './lazyLoadImage';
import { MovieInterface } from '../interface/type';
import { RootState } from '../store/store';
import PosterFallback from "../assets/no-poster.png";
import dayjs from "dayjs";

interface MovieCardProps {
    data: MovieInterface,
    fromSearch?: boolean,
    mediaType?: string,

}
const MovieCard: React.FC<MovieCardProps> = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state: RootState) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (
        // movieCard
        <div
            // className="w-[calc(50%-10px)] mb-6 cursor-pointer shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]"
            className="w-full mb-6 cursor-pointer shrink-0"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-8 flex items-end justify-between p-3 transition-all ease-in duration-500 hover:opacity-50">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            {/* textBlock */} <div className="text-white flex flex-col">
                <span className="title text-base mb-3 leading-6 line-clamp-1 md:text-xl" title={data.title || data.original_title || data.original_name}>
                    {data.title || data.original_title || data.original_name}
                </span>
                <span className="date text-sm opacity-50">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
}

export default MovieCard
