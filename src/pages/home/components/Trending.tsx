import { useState } from 'react'
import SwitchTabs from '../../../components/SwitchTabs'
import useFetchMovies from '../../../hooks/useFetchMovies';
import Carousel from '../../../components/Carousel';
import ContentWrapper from '../../../components/ContentWrapper';

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading }: any = useFetchMovies(`/trending/movie/${endpoint}`);

    const onTabChange = (tab: string) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection relative mb-16">
            <ContentWrapper>
                <span className="carouselTitle text-2xl md:text-5xl text-white font-normal">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending
