import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React                                               from 'react';

const DailyMenusList = ({title, value, items}: any) => {
    return (<Grid item xs={4}>
        <FormControl fullWidth>
            <InputLabel>{title}</InputLabel>
            <Select
                value={value}
                renderValue={(selected: string) => {
                    if (selected.length === 0) {
                        return <em>Vyberte datum lístku</em>;
                    }

                    return selected;
                }}

                onChange={(e) => {
                    location.href = (location.href + '/' + e.target.value);
                }}>
                <MenuItem disabled value="">
                    <em>Vyberte datum lístku</em>
                </MenuItem>
                {items.map(({date}) => (<MenuItem
                    key={date}
                    value={date}
                >
                    {new Date(date).toLocaleDateString()}
                </MenuItem>))}
            </Select>
        </FormControl>
    </Grid>);
};

export default DailyMenusList;
