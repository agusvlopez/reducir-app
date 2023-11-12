import { useState, useEffect } from "react";


export async function useFetch(url, options){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        fetch(url, options)
        .then((response) => response.json)
        .then((data) => setData(data))
        .finally(() => setLoading(false))
    }, []);

    
    return { data, loading };
}