import React from 'react'
import Carousel from '../../../components/Carousel'
import useFetchMovies from '../../../hooks/useFetchMovies';

const Similar = ({ mediaType, id }: any) => {
    const { data, loading, error }: any = useFetchMovies(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    )
}

export default Similar
