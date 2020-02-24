import React from 'react'
import {Grid } from "@material-ui/core";

interface PageFooterProps {
    correctGuesses: number;
    totalGuesses: number;
}

export const PageFooter = (props: PageFooterProps) => {

    return (
        <React.Fragment>
            <Grid item sm={10}>
                <span>
                    <strong>Correct Guesses:</strong> {props.correctGuesses}
                </span>
                <br />
                <span>
                    <strong>Total Guesses:</strong> {props.totalGuesses}
                </span>
            </Grid>
            <Grid item sm={2}>
                <span>
                    <strong>Win %:</strong> {props.totalGuesses ? (props.correctGuesses / props.totalGuesses).toFixed(3) : "-"}
                </span>
            </Grid>
        </React.Fragment>
    )
};