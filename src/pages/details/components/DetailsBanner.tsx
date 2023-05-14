import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import dayjs from "dayjs";

import { CrewInterface, MovieInterface } from '../../../interface/type';
import useFetchMoviesDetails from '../../../hooks/useFetchMoviesDetails';
import Img from '../../../components/lazyLoadImage';
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from '../../../components/PlayIcon';
import GenresDetails from '../../../components/GenresDetails';
import VideoPopup from './VideoPopup';
import ContentWrapper from '../../../components/ContentWrapper';
import CircleRating from '../../../components/CircleRating';
import "../../../assets/scss/details/detailsBanner.scss";
import Genres from '../../../components/Genres';

const DetailsBanner = ({ video, crew }: any) => {
    console.log('VVVV', video);

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetchMoviesDetails(`/${mediaType}/${id}`);

    const { url } = useSelector((state: RootState) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f: CrewInterface) => f.job === "Director");
    const writer = crew?.filter(
        (f: CrewInterface) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <>
                            <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden">
                                <Img src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content flex relative flex-col gap-6 md:gap-12 md:flex-row">
                                    <div className="left flex-shrink-0">
                                        {data.poster_path ? (
                                            <Img
                                                className="posterImg w-full block rounded-xl md:max-w-sm"
                                                src={
                                                    url.backdrop +
                                                    data.poster_path
                                                }
                                            />
                                        ) : (
                                            <Img
                                                className="posterImg w-full block rounded-xl md:max-w-sm"
                                                src={PosterFallback}
                                            />
                                        )}
                                    </div>
                                    <div className="right text-white">
                                        <div className="title text-3xl leading-10 md:text-4xl md:leading-[44px]">
                                            {`${data.original_title || data.title || data.name
                                                } (${dayjs(
                                                    data?.release_date
                                                ).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle text-base leading-6 mb-4 italic opacity-50 md:text-lg md:leading-7">
                                            {data.title}
                                        </div>

                                        <Genres data={_genres} />

                                        <div className="row flex items-center gap-6 mb-6">
                                            <CircleRating
                                                rating={data.vote_average.toFixed(
                                                    1
                                                )}
                                            />

                                            <div
                                                className="playbtn"
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video.key);
                                                }}
                                            >
                                                <PlayIcon />
                                                <span className="text text-xl">
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>

                                        <div className="overview mb-6">
                                            <div className="heading text-2xl mb-3">
                                                Overview
                                            </div>
                                            <div className="description leading-7 md:pr-24">
                                                {data.overview}
                                            </div>
                                        </div>

                                        <div className="info border-b-2 border-b-gray-700 py-4 px-0 flex">
                                            {data.status && (
                                                <div className="infoItem mr-3 flex flex-row flex-wrap space-y-2 md:space-y-0">
                                                    <span className="text mr-3 left-6 bold font-semibold opacity-100">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text mr-3 opacity-50 left-6">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem mr-3 flex flex-row flex-wrap space-y-2 md:space-y-0">
                                                    <span className="text mr-3 left-6 bold font-semibold opacity-100">
                                                        Fecha de Lanzamiento:{" "}
                                                    </span>
                                                    <span className="text mr-3 opacity-50 left-6">
                                                        {dayjs(
                                                            data.release_date
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem mr-3 flex flex-row flex-wrap space-y-2 md:space-y-0">
                                                    <span className="text mr-3 left-6 bold font-semibold opacity-100">
                                                        Tiempo de ejecución:{" "}
                                                    </span>
                                                    <span className="text mr-3 opacity-50 left-6">
                                                        {toHoursAndMinutes(
                                                            data.runtime
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className="info border-b-2 border-b-gray-700 py-4 px-0 flex">
                                                <span className="text mr-3 left-6 bold font-semibold opacity-100">
                                                    Director:{" "}
                                                </span>
                                                <span className="text mr-3 opacity-50 left-6">
                                                    {director?.map((d: CrewInterface, i: number) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info border-b-2 border-b-gray-700 py-4 px-0 flex">
                                                <span className="text mr-3 left-6 bold font-semibold opacity-100">
                                                    Escritor:{" "}
                                                </span>
                                                <span className="text mr-3 opacity-50 left-6">
                                                    {writer?.map((d: CrewInterface, i: number) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className="info border-b-2 border-b-gray-700 py-4 px-0 flex">
                                                <span className="text mr-3 left-6 bold font-semibold opacity-100">
                                                    Creator:{" "}
                                                </span>
                                                <span className="text mr-3 left-6 bold font-semibold opacity-100">
                                                    {data?.created_by?.map(
                                                        (d: any, i: any) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {data
                                                                    ?.created_by
                                                                    .length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <div className='ContentWrapper'>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner
