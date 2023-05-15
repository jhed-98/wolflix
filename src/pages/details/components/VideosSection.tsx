
import { useState } from "react";
import { VideosInterface } from "../../../interface/type";
import Img from "../../../components/lazyLoadImage";
import { PlayIcon } from "../../../components/PlayIcon";
import VideoPopup from "./VideoPopup";

const VideosSection = ({ data, loading }: any) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem w-[150px] shrink-0 md:w-1/2">
                <div className="thumb w-full aspect-[16/9] rounded-xl mb-2 skeleton"></div>
                <div className="row h-5 w-full rounded-lg mb-2 skeleton"></div>
                <div className="row2 h-5 w-3/4 rounded-lg skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection relative mb-12">
            {/* ContentWrapper */}
            <div className='w-full max-w-[1200px] my-0 mx-auto py-0 px-6'>
                <div className="text-2xl text-white mb-6">Official Videos</div>
                {!loading ? (
                    <div className="videos flex gap-3 overflow-x-auto mx-5 py-0 px-5 md:gap-5 md:m-0 nd:px-0 md:pb-4">
                        {data?.results?.map((video: VideosInterface) => (
                            <div
                                key={video.id}
                                className="videoItem w-[150px] flex-shrink-0 cursor-pointer md:w-1/4"
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className="videoThumbnail mb-4 relative">
                                    <Img
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    <PlayIcon />
                                </div>
                                <div className="text-white text-base leading-5 md:text-xl md:leading-6">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton flex gap-3 overflow-x-auto mx-5 py-0 px-5 md:gap-5 md:m-0 md:p-0">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </div>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    )
}

export default VideosSection
