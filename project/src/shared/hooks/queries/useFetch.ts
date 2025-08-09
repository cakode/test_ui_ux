import { useState, useEffect } from "react";
import fetchUrl from "../../utils/fetchUrl";

const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        const fetchFirstData = async () => {
            setIsloading(true);
            setError(null);

            try {
                const json = await fetchUrl<T>(url);
                setData(json);
            } catch (err: any) {
                setError(err)
            } finally {
                setIsloading(false);
            }
        };

        fetchFirstData();
    }, []);

    return { data, isLoading, error }
}

export default useFetch;