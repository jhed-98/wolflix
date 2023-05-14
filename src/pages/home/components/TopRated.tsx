import { useState } from 'react'
import useFetchMovies from '../../../hooks/useFetchMovies';
import SwitchTabs from '../../../components/SwitchTabs';
import Carousel from '../../../components/Carousel';
import ContentWrapper from '../../../components/ContentWrapper';

const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading }: any = useFetchMovies(`/${endpoint}/top_rated`);

    const onTabChange = (tab: string) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection relative mb-16">
            <ContentWrapper>
                <span className="carouselTitle text-2xl md:text-5xl text-white font-normal">Top Rated</span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
}

export default TopRated
