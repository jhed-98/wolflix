import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { CastInterface } from '../../../interface/type';

import avatar from "../../../assets/avatar.png";
import Img from '../../../components/lazyLoadImage';

const Cast = ({ data, loading }: any) => {
    const { url } = useSelector((state: RootState) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="castSection relative mb-12 mt-10">
            {/* ContentWrapper */}
            <div className='w-full max-w-[1200px] my-0 mx-auto py-0 px-6'>
                {/* sectionHeading */}
                <div className="text-2xl text-white mb-6">Top Cast</div>
                {!loading ? (
                    <div className="listItems pb-4 flex gap-5 -mx-5 py-0 px-5 overflow-y-hidden overflow-x-scroll">
                        {data?.map((item: CastInterface) => {
                            const imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="listItem text-center text-white bg-gray-900 rounded-lg">
                                    <div className={`profileImg w-32 h-40 mb-4 md:w-40 md:h-52 md:mb-7 ${item.profile_path ? '' : 'flex justify-center'} overflow-hidden bg-center bg-cover`}>
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="text-sm leading-5 font-semibold md:text-lg md:leading-7">{item.name}</div>
                                    <div className="text-sm leading-5 opacity-50 font-semibold md:text-base md:leading-7">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cast
