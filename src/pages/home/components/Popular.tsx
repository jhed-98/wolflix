import { useState } from 'react'
import useFetchMovies from '../../../hooks/useFetchMovies';
import Carousel from '../../../components/Carousel';
import SwitchTabs from '../../../components/SwitchTabs';
import ContentWrapper from '../../../components/ContentWrapper';

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading }: any = useFetchMovies(`/${endpoint}/popular`);

    const onTabChange = (tab: string) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle text-2xl md:text-5xl text-white font-normal">What's Popular</span>
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

export default Popular
