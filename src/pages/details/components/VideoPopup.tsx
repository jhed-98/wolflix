import React from 'react'
import ReactPlayer from 'react-player/youtube';
import { AiOutlineClose } from 'react-icons/ai'

const VideoPopup = ({ show, setShow, videoId, setVideoId }: any) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`z-40 flex justify-center items-center  w-full h-full ${show ? "transition duration-300 bg-black bg-opacity-90 overflow-x-hidden overflow-y-auto fixed inset-0" : "opacity-0 invisible hidden"}`}>
            <div className="relative w-full md:w-3/4 aspect-[16/9] mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${show ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>

                    <div className="relative h-auto z-50">
                        <div className='embed-responsive mt-10'>
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${videoId}`}
                                controls
                                playing={true}
                                width="853"
                                height="480"
                            />
                            {/* <iframe
                                width="853"
                                height="480"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=true`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={setVideoId}
                            /> */}
                        </div>
                        <div onClick={hidePopup} className="cursor-pointer absolute -top-10 right-0 h-10 w-10 rounded-full bg-red-600 bg-opacity-70 flex items-center justify-center">
                            <span className="text-white w-8 flex justify-center" >
                                <AiOutlineClose />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        // <div className={`videoPopup flex justify-center items-center w-full h-full fixed top-0 left-0 z-20 ${show ? "visible opacity-100 " : "opacity-0 invisible"}`}>
        //     <div className={`opacityLayer absolute top-0 left-0 w-full h-full bg-gray-950 filter transition-opacity duration-300 ${show ? "opacity-100 " : "opacity-0"}`} onClick={hidePopup}></div>
        //     <div className={`videoPlayer relative w-full md:w-3/4 aspect-[16/9] text-white scale-50 duration-200 ${show ? "scale-100 " : ""}`}>
        //         <span className="closeBtn" onClick={hidePopup}>
        //             Close
        //         </span>
        //         <ReactPlayer
        //             url={`https://www.youtube.com/watch?v=${videoId}`}
        //             controls
        //             playing={true}
        //             width="100%"
        //             height="100%"
        //         />
        //     </div>
        // </div>

    );
}

export default VideoPopup
