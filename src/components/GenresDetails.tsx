/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const GenresDetails = ({ data }: any) => {
    const { genres }: any = useSelector((state: RootState) => state.home);

    return (
        <div className="genres">
            {data?.map((g: any) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="genre bg-red-900 rounded-md py-1 px-2 text-md md:text-base text-white whitespace-nowrap">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
}

export default GenresDetails
