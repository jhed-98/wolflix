
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import { FetchAllGenres } from "../interface/type";
const useFetchGeners = (url: string) => {
    //Guarda los datos del la consulta en un interface
    const [data, setData] = useState<FetchAllGenres | null>(null);
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
                // console.log('IMAGES', res);

            })
            .catch(() => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetchGeners;
