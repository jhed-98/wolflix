import React from 'react'
import DetailsBanner from './components/DetailsBanner'
import Cast from './components/Cast'
import VideosSection from './components/VideosSection'
import Similar from './components/Similar'
import Recommendation from './components/Recommendation'
import useFetchCredits from '../../hooks/useFetchCredits'
import useFetchVideos from '../../hooks/useFetchVideos'
import { useParams } from 'react-router-dom'

const DetailsPage = () => {

    const { mediaType, id } = useParams();
    const { data, loading } = useFetchVideos(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetchCredits(
        `/${mediaType}/${id}/credits`
    );

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default DetailsPage
