import { FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select } from "@material-ui/core";
import dynamic                                                             from "next/dynamic";
import { useRouter }                                                       from "next/router";
import React, { useState }                                                 from "react";
import useSWR                                                              from "swr";
import fetcherMiddleware, { fetcher }                                      from "../../../middleware/fetcher";

//const useStyles = makeStyles((theme: Theme) => createStyles({}),);

function Menus() {
    const router = useRouter();
    // noinspection JSUnusedLocalSymbols
    const [ id, menuType, menuId, menuCategori ] = router.query.path;
    const { data, error } = useSWR(`/api/r1/${id}/menus`, fetcher, { use: [ fetcherMiddleware ] });
    const [ results, setResults ] = useState();

    return !data ? <Grid container item justifyContent="center" alignContent="center">
        <LinearProgress/>
    </Grid> : (error ? <Grid container item justifyContent="center" alignContent="center">
        Error loading data
    </Grid> : <Grid container item xs={12}
                    justifyContent="center"
                    alignContent="space-between">
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Vyberte jídelní lístek</InputLabel>
                <Select
                    defaultValue=""
                    variant="outlined"
                    renderValue={(selected: string) => {
                        if (selected.length === 0) {
                            return <em>Vyberte jídelní lístek</em>;
                        }
                        return selected['name'];
                    }}
                    onChange={async (e) => {
                        const { value }: any = e.target;
                        const { id, categories }: any = value;
                        localStorage.setItem(menuType, value);
                        const MenusCategories = dynamic(() => {
                            // @ts-ignore
                            // noinspection LocalVariableNamingConventionJS
                            return import("./MenusCategories");
                        }, {
                            loading: () => <Grid item xs={12}><LinearProgress/></Grid>,
                        });

                        // @ts-ignore
                        setResults((undef) => {
                            // @ts-ignore
                            return <MenusCategories items={categories}
                                                    value="" parent={id}
                                                    title="Vyberte kategorii"/> || undef;
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
}

export default Menus;

