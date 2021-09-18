// import { useSWRConfig } from "swr";
import fetch                 from 'cross-fetch';
import { getLocationOrigin } from "next/dist/shared/lib/utils";

export const fetcher = async (urlProp) => {
    let url = urlProp.startsWith('http') ? urlProp : (typeof window !== "undefined" ? getLocationOrigin()
        : 'https://we.prim.dev') + urlProp;
    console.log('Fetching', url);
    const [ res ] = await Promise.all([
        fetch(url, {
            mode: 'cors', referrerPolicy: 'same-origin', headers: new Headers({
                "Accept-Language": "cs", "Content-Type": "application/json", "X-Restu-Api-Key": process.env.API_KEY
            }) //
            //mode: 'no-cors', referrerPolicy: 'same-origin', 
        }).then(async (res) => await res.json())
    ]);
    return res;
};

const fetcherMiddleware = (useSWRNext) => {
    return (key, fetcher, config) => {
        // Before hook runs...
        console.log('Before: ', key);
        // Handle the next middleware, or the `useSWR` hook if this is the last one.
        const swr = useSWRNext(key, fetcher, config);
        const extendedFetcher = (...args) => {
            console.log('SWR Args:', ...args);
            // If the status code is not in the range 200-299,
            // we still try to parse and throw it.
            if (!swr.ok) {
                const error = new Error('An error occurred while fetching the data.');
                // Attach extra info to the error object.
                error.stack = swr.json();
                error.name = swr.status;
                throw error
            }

            return fetcher(...args)
        };
        // After hook runs...
        console.log('After: ', swr);

        return swr;
    }
};

export default fetcherMiddleware;
