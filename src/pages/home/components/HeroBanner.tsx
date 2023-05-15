import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../store/store';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage';
import { BiSearchAlt } from 'react-icons/bi'

const HeroBanner = () => {

    const [background, setBackground] = useState("");
    const [alt, setAlt] = useState("");
    const [query, setQuery] = useState("");
    //route-->navigate navegacion de la pagina
    const navigate = useNavigate();
    //Redux llamando los actions
    const { url } = useSelector((state: RootState) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        //Genera un numero random
        const indexRandom: number = Math.floor(Math.random() * 20);
        //Se crea una url de la imagen para la portada
        const bg = String(url.backdrop + data?.results?.[indexRandom]?.backdrop_path);

        const titulo = String(data?.results?.[indexRandom]?.original_title);

        setBackground(bg);
        setAlt(titulo);
    }, [data]);

    //Methos para el buscador
    const searchQueryHandler = (event: any) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        // heroBanner
        <div className='heroBanner w-full h-[450px] md:h-[700px] bg-black flex items-center relative'>

            {!loading && (
                <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">
                    <Img src={background} alt={alt} />
                </div>
            )}
            {/* opacity-layer */}
            <div className="w-full h-64 absolute bottom-0 left-0 bg-opacity-layer"></div>
            {/* ContentWrapper */}
            <div className='w-full max-w-[1200px] my-0 mx-auto py-0 px-6'>
                {/* heroBannerContent */}
                <div className="flex flex-col items-center text-white text-center relative max-w-[800px] my-0 mx-auto gap-4">
                    <span className="font-bold text-5xl md:text-[90px] mb-3 md:mb-0 ">Welcome.</span>
                    <span className="text-lg font-medium mb-10 md:mb-0 md:text-2xl">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    {/* searchInput */}
                    <div className="flex justify-center items-center w-full">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                            className='w-[calc(100%-100px)] h-14 outline-0 border-0 rounded-input-search md:w-[calc(100%-150px)] md:h-16 md:text-xl md:py-0 md:px-8 text-gray-900'
                        />
                        <button className='flex justify-center items-center w-16 h-14 bg-button-search text-white outline-0 border-0 rounded-button-search text-base cursor-pointer md:w-28 md:h-16 md:text-lg'>
                            <BiSearchAlt className="text-3xl md:text-5xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner

