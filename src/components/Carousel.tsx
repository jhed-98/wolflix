import { useRef } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { MovieInterface } from '../interface/type';

import {
    BsArrowLeftShort,
    BsArrowRightShort,
} from "react-icons/bs";

import PosterFallback from "../assets/no-poster.png";
import dayjs from 'dayjs';
import Img from './lazyLoadImage';
import CircleRating from './CircleRating';
import Genres from './Genres';

interface CarousleProps {
    data: MovieInterface[],
    loading?: boolean;
    endpoint?: string;
    title?: string;
}

const Carousel: React.FC<CarousleProps> = ({ data, loading, endpoint, title }) => {
    const carouselContainer: any = useRef();
    // Obtenemos los generos que se guardaron en redux
    const { url } = useSelector((state: RootState) => state.home);
    const navigate = useNavigate();

    const navigation = (dir: string) => {
        const container: any = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            // skeletonItem
            <div className="w-32 flex-shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]">
                {/* posterBlock */}
                <div className="rounded-xl w-full aspect-[1/1.5] mb-4 skeleton"></div>
                {/* textBlock */}
                <div className="flex flex-col space-y-2">
                    <div className="w-full h-4 mb-0 skeleton"></div>
                    <div className="w-3/4 h-4 skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        // carousel
        <div className="mb-[50px]">
            {/* ContentWrapper */}
            <div className='w-full max-w-[1200px] my-0 mx-auto py-0 px-6 relative'>
                {/* carouselTitle */}
                {title && <div className="text-2xl text-white mb-[20px] font-normal">{title}</div>}
                {/* carouselLeftNav arrow */}
                <BsArrowLeftShort
                    className="left-8 text-3xl bg-red-700 rounded-full text-white absolute top-[44%] -translate-y-1/2 cursor-pointer z-10 hidden md:block md:text-4xl lg:text-5xl hover:opacity-80 hover:bg-red-800"
                    onClick={() => navigation("left")}
                />
                {/* carouselRighttNav arrow */}
                <BsArrowRightShort
                    className="right-8 text-3xl bg-red-700 rounded-full text-white absolute top-[44%] -translate-y-1/2 cursor-pointer z-10 hidden md:block md:text-4xl lg:text-5xl hover:opacity-80 hover:bg-red-800"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    // carouselItems
                    <div className="flex gap-3 overflow-y-hidden mx-1 py-0 px-5 md:mx-2 md:gap-5 md:overflow-hidden md:m-0 md:p-0" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                            return (
                                // carouselItem
                                <div
                                    key={item.id}
                                    className="w-32 cursor-pointer flex-shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]"
                                    onClick={() =>
                                        navigate(
                                            `/${item.media_type || endpoint}/${item.id
                                            }`
                                        )
                                    }
                                >
                                    <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-8 flex items-end justify-between p-3">
                                        <Img src={posterUrl} />
                                        <CircleRating
                                            rating={item.vote_average.toFixed(
                                                1
                                            )}
                                        />
                                        <Genres
                                            data={item.genre_ids.slice(0, 2)}
                                        />
                                    </div>
                                    {/* textBlock */}
                                    <div className="text-white flex flex-col">
                                        <span className="title text-base mb-3 leading-6 line-clamp-1 md:text-xl" title={item.original_title || item.original_name || item.title}>
                                            {item.original_title || item.original_name || item.title}
                                        </span>
                                        <span className="date text-sm opacity-50">
                                            {dayjs(item.release_date || item.first_air_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // loadingSkeleton
                    <div className="flex gap-3 overflow-y-hidden mx-1 md:mx-2 py-0 px-5 md:gap-5 md:overflow-hidden md:m-0 md:p-0">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Carousel
