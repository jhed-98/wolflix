import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { CastInterface } from '../../../interface/type';

import avatar from "../../../assets/avatar.png";
import Img from '../../../components/lazyLoadImage';
import "../../../assets/scss/details/cast.scss";

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
        <div className="castSection relative mb-12">
            <div className='contentWrapper'>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item: CastInterface) => {
                            const imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
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
