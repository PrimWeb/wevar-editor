import { CircularProgress, GridList, ListItem, ListItemText, } from "@material-ui/core";
import ErrorIcon                                               from "@material-ui/icons/Error";
import React                                                   from "react";
import { Container }                                           from "../Container";

export const CustomItem = ({item}) => {
    return (<ListItem>
        <ListItemText>{item.toString()}</ListItemText>
    </ListItem>);
};

export const Custom3 = (props) => {
    if (props.text && !props?.data) {
        return (<Container {...props} className="overflow-hidden">
            <div className="w-full mb-4">
                <h2 className="text-center text-info">
                    <CircularProgress color="primary" size="1.5rem"/>
                    {props.text}
                </h2>
            </div>
        </Container>);
    }

    if (props.error) {
        return (<Container {...props} className="overflow-hidden">
            <div className="w-full mb-4">
                <h2 className="text-center text-danger" color="danger">
                    <ErrorIcon fontSize="small" color="secondary"/>
                    {props?.text}
                </h2>
                <p>{props.error.message}</p>
            </div>
        </Container>);
    }

    if (props.text) {
        return (<Container {...props} className="overflow-hidden">
            <div className="w-full mb-4">
                <h2 className="text-primary" color="primary">
                    {props?.text}
                </h2>
            </div>
        </Container>);
    }

    if (props.data?.data) {
        return (<Container {...props} className="overflow-hidden">
            <div className="w-full mb-4">
                <h2 className="text-center text-xs text-white">
                    I must have at least 1 button
                </h2>
            </div>
            <GridList>
                {props.fallback.data.map((item) => console.log({item}))}
            </GridList>
        </Container>);
    }
    console.log(props);
    return <Container {...props}></Container>;
};
