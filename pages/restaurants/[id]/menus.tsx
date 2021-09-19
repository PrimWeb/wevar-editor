import { FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select } from "@material-ui/core";
import dynamic                                                             from "next/dynamic";
import { useRouter }                                                       from "next/router";
import React, { useState }                                                 from "react";
import useSWR                                                              from "swr";
import fetcherMiddleware, { fetcher }                                      from "../../../middleware/fetcher";

const Daily_menus = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR(`/api/r1/${id}/menus`, fetcher, { use: [ fetcherMiddleware ] });
    const [ results, setResults ] = useState();

    return !data ? <Grid container item justifyContent="center" alignContent="center">
        <LinearProgress/>
    </Grid> : (error ? <Grid container item justifyContent="center" alignContent="center">
        Error loading data
    </Grid> : <Grid container
                    justifyContent="center"
                    spacing={3}
                    alignContent="space-between">
        <Grid item xs={4}>
            <FormControl fullWidth>
                <InputLabel>Vyberte jídelní lístek</InputLabel>
                <Select
                    defaultValue=""
                    renderValue={(selected: string) => {
                        if (selected.length === 0) {
                            return <em>Vyberte jídelní lístek</em>;
                        }
                        return selected['name'];
                    }}
                    onChange={async (e) => {
                        const { value } = e.target;
                        // // Dynamica
                        // lly load fuse.js
                        // noinspection LocalVariableNamingConventionJS
                        let MenusCategories = dynamic(() => {
                            return import('@/components/restaurants/Elements/menusCategories');
                        }, {
                            loading: () => <p>...</p>
                        });

                        console.log(value);
                        // @ts-ignore
                        setResults((undef) => {
                            // @ts-ignore
                            return undef || <MenusCategories title="Vyberte kategorii" items={value.categories}
                                // @ts-ignore
                                                             value="" parent={value.id}/>;
                        });
                    }}>
                    <MenuItem disabled value="">
                        <em>Vyberte jídelní lístek</em>
                    </MenuItem>
                    {data.map((item) => <MenuItem
                        key={item.id}
                        value={item}
                    >
                        {item.name}
                    </MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
        {results}
    </Grid>);
};
export default Daily_menus;
