import { useState } from 'react'
import useFetchMovies from '../../../hooks/useFetchMovies';
import Carousel from '../../../components/Carousel';
import SwitchTabs from '../../../components/SwitchTabs';

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading }: any = useFetchMovies(`/${endpoint}/popular`);

    const onTabChange = (tab: string) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        // carouselSection
        <div className="relative mb-[70px]">
            {/* ContentWrapper */}
            <div className='w-full max-w-[1200px] my-0 mx-auto py-0 px-6 flex items-center justify-between mb-5'>
                {/* carouselTitle */}
                <span className="text-xl md:text-3xl text-white font-normal">What's Popular</span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </div>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
}

export default Popular
