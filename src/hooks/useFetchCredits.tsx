
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import { FetchAllCredits } from "../interface/type";
const useFetchCredits = (url: string) => {
    //Guarda los datos del la consulta en un interface
    const [data, setData] = useState<FetchAllCredits | null>(null);
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
                // console.log('CREDITS', res);

            })
            .catch(() => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetchCredits;
