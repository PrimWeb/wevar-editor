import { Button, Grid }                    from "@material-ui/core";
import Avatar                              from '@material-ui/core/Avatar';
import Card                                from '@material-ui/core/Card';
import CardActions                         from '@material-ui/core/CardActions';
import CardHeader                          from '@material-ui/core/CardHeader';
import CardMedia                           from '@material-ui/core/CardMedia';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React                               from 'react';
import { SWRConfig }                       from "swr";
import fetcherMiddleware                   from "../../../middleware/fetcher";

const useStyles = makeStyles((theme?: Theme) => createStyles({
    root:     {
        maxWidth: 345, theme: {
            props: theme.props
        }
    }, media: {
        height: 0, paddingTop: '56.25%', // 16:9
    }
}));

const Restaurant = ({ data }) => {
    // @ts-ignore
    const classes = useStyles();
    const [ expanded, setExpanded ] = React.useState(false);
    const { id, seo_name, name, cover_photo, city, street, zip_code } = data;
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const adress = street + ", " + city + " " + zip_code;
    return (<><SWRConfig value={{ use: [ fetcherMiddleware ] }}>
        <Card className={classes.root}>
            <CardHeader
                titleTypographyProps={{ style: { fontSize: 20 } }}
                avatar={<Avatar aria-label="recipe">
                    {name[0]}
                </Avatar>}
                title={name}
                subheader={adress}
            />
            <CardMedia
                className={classes.media}
                image={cover_photo.original_url}
                title={name}
            />
            <CardActions>
                <Grid
                    container
                    spacing={1}
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Button
                        href={`/restaurants/${id}/daily_menus`}
                        aria-label="daily_menus"
                        variant="outlined">
                        Denní Menu
                    </Button>
                    <Button href={`/restaurants/${id}/menus`} aria-label="menus"
                            variant="outlined">
                        Stálá Menu
                    </Button>
                </Grid>
            </CardActions>
        </Card>
    </SWRConfig></>);
}

export default Restaurant;
