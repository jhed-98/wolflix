import { useState } from 'react'
import SwitchTabs from '../../../components/SwitchTabs'
import useFetchMovies from '../../../hooks/useFetchMovies';
import Carousel from '../../../components/Carousel';

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading }: any = useFetchMovies(`/trending/movie/${endpoint}`);

    const onTabChange = (tab: string) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        // carouselSection
        <div className="relative mb-[70px]">
            {/* ContentWrapper */}
            <div className='w-full max-w-[1200px] my-0 mx-auto py-0 px-6 flex items-center justify-between mb-5'>
                {/* carouselTitle */}
                <span className="text-xl md:text-3xl text-white font-normal">Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </div>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending
