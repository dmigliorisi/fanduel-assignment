import React, {ChangeEvent} from 'react'
import {Grid, Slider} from "@material-ui/core";

interface PageHeaderProps {
    setOptionsCount: (count: number) => void;
    optionsCount: number;
    maxOptions: number;
}

export const PageHeader = (props: PageHeaderProps) => {

    const onChange = (ev: ChangeEvent<{}>, val: number | number[]): void => {
        props.setOptionsCount(val as number);
    };

    return (
        <React.Fragment>
            <Grid item sm={12}>
                <h1>FanDuel Code Assignment</h1>
            </Grid>
            <Grid item sm={12} md={6}>
                <h4>Who has the most FPPG?</h4>
            </Grid>
            <Grid item sm={12} md={6}>
                <Slider
                    defaultValue={props.optionsCount}
                    valueLabelDisplay={"auto"}
                    step={1}
                    marks={true}
                    min={2}
                    max={props.maxOptions}
                    onChange={onChange}
                />
            </Grid>

        </React.Fragment>
    )
};