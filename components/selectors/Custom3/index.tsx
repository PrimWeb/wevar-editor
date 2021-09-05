import React                                                  from 'react';
import { Container }                                          from '../Container';
import useSwr                                                 from 'swr';
import { CircularProgress, GridList, ListItem, ListItemText } from "@material-ui/core";
import ErrorIcon                                              from '@material-ui/icons/Error';
import bcrypt                                                 from "../../../middleware/bcrypt";
import User                                                   from "../../../models/user";

export let defOpt: { id: number; url: URL; stringUrl?: (id?: number, url?: URL) => string; data: Promise<any>, endpoint: string, headers: Headers };

defOpt = {
    id: null,
    url: new URL('https://rest-api.restu.cz/v1/restaurants'),
    stringUrl: (id?: number, url?: URL) => {
        return (id || defOpt.id) > 0 && defOpt?.url
            ? `${(url || defOpt?.url)}/${(id || defOpt?.id)}${defOpt.endpoint}` : null;
    },
    data: null,
    endpoint: '',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'X-Restu-Api-Key': 'a5d7e624bd4366b64b61702ae47c8804',
        'Upgrade-Insecure-Requests': '1',
        // 'Access-Control-Allow-Origin': '*',
    })
};

if (process.env.NODE_ENV === 'development') {
    defOpt.id = 23030;
    defOpt.endpoint = '/daily_menus';
}

let reqInit: RequestInit = {
    method: '*',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: new Headers(defOpt.headers),
    redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'origin-when-cross-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //body: JSON.stringify({}) // body data type must match "Content-Type" header
};

const fetcher = (url: string, reqInit?: RequestInit) => fetch(url, reqInit).then((res) => {
    console.debug(res);
    return res.json();
});


const handler = async (req, res) => {
    if (req.method === 'GET', req) {
        
    }
};

export const CustomFetch = ({item}) => {
    return <ListItem>
        <ListItemText>{item.toString()}</ListItemText>
    </ListItem>;
};

export const Custom3 = ({props}) => {
    let ret;
    let {data, error} = useSwr([defOpt.stringUrl(), reqInit], fetcher);

    console.debug(data, error);

    if (!data) {
        ret = <Container {...props} className="overflow-hidden">
            <div className="w-full mb-4">
                <h2 className="text-center text-info">
                    <CircularProgress color='primary' size="1.5rem"/>
                    Loading...
                </h2>
            </div>
        </Container>;
    }

    if (error) {
        ret = <Container {...props} className="overflow-hidden">
            <div className="w-full mb-4">
                <h2 className="text-center text-danger" color="danger">
                    <ErrorIcon fontSize="small" color="secondary"/>
                    Failed to load users
                </h2>
            </div>
        </Container>;
    }

    if (data) {
        ret = <Container {...props} className="overflow-hidden">
            <div className="w-full mb-4">
                <h2 className="text-center text-xs text-white">
                    I must have at least 1 button
                </h2>
            </div>
            <GridList>
                {data.map((item) => (
                    <CustomFetch item={item}/>
                ))}
            </GridList>
        </Container>;
    }

    return <>{ret}</>;
};

Custom3.craft = {
    ...Container.craft,
    displayName: 'Custom Data'
};
