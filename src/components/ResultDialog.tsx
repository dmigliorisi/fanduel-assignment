import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import React from "react";

interface ResultDialogProps {
    correctGuesses: number;
    onResetClick: () => void;
    onContinueClick: () => void;
    isDialogOpen: boolean;
    title: string;
}

export const ResultDialog = (props: ResultDialogProps) => {

    const onCloseDialog = () => {
        props.correctGuesses < 10 ? props.onContinueClick() : props.onResetClick();
    };

    return (
        <Dialog open={props.isDialogOpen} onClose={onCloseDialog}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogActions>
                {
                    props.correctGuesses === 10 ?
                        <Button onClick={props.onResetClick} color={"primary"}>Start Over</Button>
                        :
                        <Button onClick={props.onContinueClick} color={"primary"}>Continue</Button>
                }
            </DialogActions>
        </Dialog>

    )
}