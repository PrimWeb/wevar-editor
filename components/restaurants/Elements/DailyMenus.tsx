import DailyMenusList                 from "@/components/restaurants/Elements/DailyMenusList";
import { Grid, LinearProgress }       from "@material-ui/core";
import { useRouter }                  from "next/router";
import React                          from "react";
import useSWR                         from "swr";
import fetcherMiddleware, { fetcher } from "../../../middleware/fetcher";

function DailyMenus() {
    const router = useRouter();

    const [ id/*, menuType, menuId, menuCategori */ ] = router.query.path;
    const { data, error } = useSWR(`/api/r1/${id}/daily_menus`, fetcher, { use: [ fetcherMiddleware ] });

    if (!data || error) {
        return <Grid container item justifyContent="center" alignContent="center">
            <LinearProgress/>
        </Grid>;
    }
    return (<><Grid container justifyContent="center" spacing={3} alignContent="center">
        <DailyMenusList items={data} title="Vybrat den ..."/>
    </Grid></>);
}

export default DailyMenus;
