/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import ContentWrapper from '../../components/ContentWrapper';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import Spinner from '../../components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/MovieCard';
import { MovieInterface } from '../../interface/type';

const SearchPage = () => {
    const [data, setData] = useState<any>(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                console.log('SEARCH', data?.results);
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        // searchResultsPage
        <div className="min-h-[700px] pt-28">
            {loading && <Spinner initial={true} />}
            {!loading && (
                // ContentWrapper 
                <div className='w-full max-w-[1200px] my-0 mx-auto py-0 px-6'>

                    {data?.results?.length > 0 ? (
                        <>
                            {/* pageTitle */}
                            <div className="text-2xl leading-9 text-white md:mb-0">
                                {`Search ${data?.total_pages > 1
                                    ? "results"
                                    : "result"
                                    } of '${query}'`}
                            </div>
                            {/* content */}
                            <InfiniteScroll
                                // className="flex flex-wrap flex-row gap-3 mb-12 md:gap-5"
                                className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 md:gap-5"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item: MovieInterface, index: number) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        // resultNotFound
                        <span className="text-5xl text-gray-200">
                            Sorry, Results not found!
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchPage
