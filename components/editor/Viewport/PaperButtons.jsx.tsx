import { Fab, Grid, makeStyles } from "@material-ui/core";
import AddIcon                   from "@material-ui/icons/Add";
import DeleteIcon                from "@material-ui/icons/Delete";
import React                     from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', flexDirection: 'column', minHeight: '100vh'
    }, footer: {
        padding: theme.spacing(3, 2), marginTop: 'auto', backgroundColor: "transparent", position: "sticky"
    }, margin: {
        margin: theme.spacing(1)
    }, extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export const PaperButtons = () => {
    const classes = useStyles();

    return <Grid container item justifyContent="space-between" alignItems="center"
                 className={classes.footer}>
        <Fab size="medium" color="primary" aria-label="add"
             variant="extended"
             className={classes.margin}>
            <AddIcon className={classes.extendedIcon}/>
            Přidat stránku
        </Fab>, <Fab size="medium" color="secondary" aria-label="delete"
                     variant="extended"
                     className={classes.margin}>
        <DeleteIcon className={classes.extendedIcon}/>
        Smazat stránku
    </Fab>
    </Grid>;
};;
