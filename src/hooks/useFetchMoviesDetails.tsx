
import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import { FetchAllMovies, MovieInterface } from "../interface/type";
const useFetchMoviesDetails = (url: string) => {
    //Guarda los datos del la consulta en un interface
    const [data, setData] = useState<MovieInterface | null>(null);
    const [loading, setLoading] = useState<string | boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
                // console.log('MOVIES DETAILS', res);

            })
            .catch(() => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetchMoviesDetails;
