import { useRef } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { MovieInterface } from '../interface/type';

import "../assets/scss/components/carousel.scss"

import {
    BsArrowLeftShort,
    BsArrowRightShort,
} from "react-icons/bs";

import PosterFallback from "../assets/no-poster.png";
import dayjs from 'dayjs';
import Img from './lazyLoadImage';
import CircleRating from './CircleRating';
import Genres from './Genres';
import ContentWrapper from './ContentWrapper';

interface CarousleProps {
    data: MovieInterface[],
    loading?: boolean;
    endpoint?: string;
    title?: string;
}

const Carousel: React.FC<CarousleProps> = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
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
            <div className="skeletonItem">
                <div className="posterBlock rounded-xl w-full aspect-[1/1.5] mb-4 skeleton"></div>
                <div className="textBlock flex flex-col space-y-2">
                    <div className="title w-full h-4 mb-0 skeleton"></div>
                    <div className="date w-3/4 h-4 skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel mb-12">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsArrowLeftShort
                    className="carouselLeftNav arrow "
                    onClick={() => navigation("left")}
                />
                <BsArrowRightShort
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() =>
                                        navigate(
                                            `/${item.media_type || endpoint}/${item.id
                                            }`
                                        )
                                    }
                                >
                                    <div className="posterBlock ">
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
                                    <div className="textBlock text-white flex flex-col">
                                        <span className="title text-base mb-3 leading-6 text-ellipsis md:text-xl">
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
                    <div className="loadingSkeleton flex gap-3 overflow-y-hidden mx-1 md:mx-2 py-0 px-5 md:gap-5 md:overflow-hidden md:m-0 md:p-0">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel
