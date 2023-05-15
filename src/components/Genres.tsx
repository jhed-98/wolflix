import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Genres = ({ data }: any) => {
    const { genres }: any = useSelector((state: RootState) => state.home);

    return (
        <div className="genres">
            {data?.map((g: any) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
}

export default Genres
