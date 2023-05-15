/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../../components/Spinner'
import useFetchGeners from '../../hooks/useFetchGeners'
import { GenreInterface, MovieInterface } from '../../interface/type'
import MovieCard from '../../components/MovieCard'

let filters: any = {};

const sortbyData: Array<{ value: string, label: string }> = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const ExplorePage = () => {
    const [data, setData] = useState<any>(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState<any>(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetchGeners(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    // results: [...data?.results, ...res.results],
                    results: [...data.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems: any, action: any) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g: any) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };
    return (
        // explorePage
        <div className="min-h-[700px] pt-28">
            {/* ContentWrapper */}
            <div className='w-full max-w-[1200px] my-0 mx-auto py-0 px-6'>
                {/* pageHeader */}
                <div className="flex justify-between mb-6 flex-col md:flex-row">
                    {/* pageTitle */}
                    <div className="text-2xl leading-9 text-white md:mb-0">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option: GenreInterface) => option.name}
                            getOptionValue={(option: GenreInterface) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            // content
                            <InfiniteScroll
                                // className="flex flex-wrap flex-row gap-3 mb-12 md:gap-5"
                                className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 md:gap-5"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item: MovieInterface, index: number) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            // resultNotFound
                            <span className="text-5xl text-gray-200">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default ExplorePage
