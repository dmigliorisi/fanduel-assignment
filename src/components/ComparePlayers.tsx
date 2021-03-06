import {Grid} from "@material-ui/core";
import React from "react";
import {Player, Team} from "../definitions/commonTypes";
import {PlayerCard} from "./PlayerCard";

interface ComparePlayersProps {
    onGuess: (isCorrect: boolean) => void;
    optionsCount: number;
    players: Array<Player>;
    teams: Array<Team>;
}


export const ComparePlayers = (props: ComparePlayersProps) => {
    /**
     *
     * @param selectedPlayerFppg
     */
    const handleSelectPlayer = (selectedPlayerFppg: number) => {

        // Create an array of all Ffpg in the set, sort numerically descending, and choose the first index
        let mostFppg = props.players.map(player => player.fppg).sort((a: number, b: number) => b - a);

        // compare selected players Fppg to the most in the set
        // if they are the same the user has selected correctly
        props.onGuess(selectedPlayerFppg === mostFppg[0])
    };

    const getPlayersTeam = (player: Player): Team => props.teams.filter((team: Team) => team.id === player.team._members[0])[0]

    return (
        <React.Fragment>
            {
                props.players.length > 0 && props.players.map((player) =>
                    <Grid
                        item
                        xs={12}
                        md={props.optionsCount === 2 ? 6 : 4}
                        key={player.id}
                    >
                        <PlayerCard
                            handleSelectPlayer={handleSelectPlayer}
                            player={player}
                            team={getPlayersTeam(player)}
                        />
                    </Grid>
                )
            }

        </React.Fragment>
    )

};