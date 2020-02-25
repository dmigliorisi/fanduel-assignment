import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Player, Team} from "../definitions/commonTypes";

interface PlayerCardProps {
    player: Player;
    team: Team;
    handleSelectPlayer: (fppg: number) => void;
}

export const PlayerCard = (props: PlayerCardProps) => {

    const useStyles = makeStyles({
        media: {
            height: 140,
            maxWidth: 200,
            margin: "0 auto"
        },
    });

    const classes = useStyles();

    const handleClick = () => {
        props.handleSelectPlayer(props.player.fppg);
    };

    return (
        <Card>
            <CardActionArea>
                <CardMedia className={classes.media} image={props.player.images.default.url}
                           title={props.player.last_name}/>
                <CardContent>
                    <span>
                        {props.player.first_name} {props.player.last_name}
                    </span>
                    <br/>
                    <span>
                        {props.team.full_name}
                    </span>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={handleClick}>Select</Button>
            </CardActions>
        </Card>
    );
};
