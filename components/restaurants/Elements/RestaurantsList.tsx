import { Grid }    from "@material-ui/core";
import React       from 'react';
import useSWR      from "swr";
import { fetcher } from "../../../middleware/fetcher";
import Restaurant  from "./Restaurant";

// const fetcher = (url) => fetch(url).then((res) => res.json());

const RestaurantsList = () => {

    const { data, error } = useSWR(`/api/r1`, fetcher);

    if (error) {
        console.log(error);
        return <div>Failed to load</div>;
    }
    if (!data) {
        return <div>Loading...</div>;
    }
    return (<Grid
        container
        justifyContent="space-around"
        alignItems="center"
        direction="row"
    >
        {data.map((elm) => <Restaurant {...{ data: elm, fallback: data }} key={elm.id}/>)}
    </Grid>);
};

export default RestaurantsList;
