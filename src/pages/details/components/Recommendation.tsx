import React from 'react'
import useFetchMovies from '../../../hooks/useFetchMovies';
import Carousel from '../../../components/Carousel';

const Recommendation = ({ mediaType, id }: any) => {
    const { data, loading, error }: any = useFetchMovies(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
}

export default Recommendation