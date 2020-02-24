import React from "react";
import {Container, Grid} from "@material-ui/core";
import {ComparePlayers} from "./components/ComparePlayers";
import {PageFooter} from "./components/PageFooter";
import {PageHeader} from "./components/PageHeader";
import {ResultDialog} from "./components/ResultDialog";
import DataResponse, {Player, Team} from "./definitions/commonTypes";
import axios from "axios";
import {getRandomPlayers} from "./utils";

interface AppState {
    correctGuesses: number;
    totalGuesses: number;
    optionsCount: number;
    players: Array<Player>;
    teams: Array<Team>;
    randomPlayers: Array<Player>;
    isResultDialogOpen: boolean;
    resultDialogTitle: string;
}

class MyApp extends React.Component<any, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            correctGuesses: 0,
            totalGuesses: 0,
            optionsCount: 2,
            players: [],
            teams: [],
            randomPlayers: [],
            isResultDialogOpen: false,
            resultDialogTitle: ""
        };
    }

    /**
     * When the component mounts make the request for the data and store in local state
     */
    componentDidMount(): void {
        axios.get<DataResponse>("https://gist.githubusercontent.com/liamjdouglas/bb40ee8721f1a9313c22c6ea0851a105/raw/6b6fc89d55ebe4d9b05c1469349af33651d7e7f1/Player.json")
            .then(({data}) => {

                // Initialize the random players
                this.setState({
                    ...this.state,
                    players: data.players,
                    teams: data.teams,
                    randomPlayers: getRandomPlayers(data.players, this.state.optionsCount)
                });
            })
    }

    /**
     * Handler for when a user updates the slider
     * If the count is unchanged dont update state
     * @param count
     */
    handleUpdateOptionsCount = (count: number) => {
        if (count === this.state.optionsCount)
            return;

        // Update the randomplayers in the local store
        this.setState({
            ...this.state,
            optionsCount: count,
            randomPlayers: getRandomPlayers(this.state.players, count)
        });

    };

    /**
     * Opens the dialog with a message for the user to notify of correct or incorrect guess
     *  if correct guess increment the score, otherwise just increment the total guesses
     *
     * @param isCorrect
     */
    handleGuess = (isCorrect: boolean) => {

        if (isCorrect) {
            this.setState({
                ...this.state,
                correctGuesses: this.state.correctGuesses + 1,
                totalGuesses: this.state.totalGuesses + 1,
                isResultDialogOpen: true,
                resultDialogTitle: "Correct!"
            })
        } else {
            this.setState({
                ...this.state,
                totalGuesses: this.state.totalGuesses + 1,
                isResultDialogOpen: true,
                resultDialogTitle: "Wrong!"
            })
        }
    };

    /**
     * Maintain current state of the game but refresh the options (players) and close any open dialog
     */
    refreshGame = () => {
        this.setState({
            ...this.state,
            isResultDialogOpen: false,
            randomPlayers: getRandomPlayers(this.state.players, this.state.optionsCount)
        });
    };

    /**
     * Reset the guesses counts back to 0 and refresh the options
     */
    resetGame = () => {
        this.setState({
            ...this.state,
            correctGuesses: 0,
            totalGuesses: 0,
            isResultDialogOpen: false,
            randomPlayers: getRandomPlayers(this.state.players, this.state.optionsCount)
        });
    };

    render() {
        return (
            <React.Fragment>
            {this.state.players.length > 0 && (
                <Container>
                    <ResultDialog
                        correctGuesses={this.state.correctGuesses}
                        onContinueClick={this.refreshGame}
                        onResetClick={this.resetGame}
                        isDialogOpen={this.state.isResultDialogOpen}
                        title={this.state.resultDialogTitle}
                    />
                    <Grid container spacing={3}>
                        <PageHeader
                            setOptionsCount={this.handleUpdateOptionsCount}
                            optionsCount={this.state.optionsCount}
                            maxOptions={Math.floor(this.state.players.length / 5)}
                        />
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            this.state.players.length &&
                            <ComparePlayers
                                players={this.state.randomPlayers}
                                optionsCount={this.state.optionsCount}
                                onGuess={this.handleGuess}
                            />
                        }
                    </Grid>
                    <Grid container spacing={3}>
                        <PageFooter correctGuesses={this.state.correctGuesses} totalGuesses={this.state.totalGuesses}/>
                    </Grid>

                </Container>
            )}
            </React.Fragment>
        )
    }
}

export default MyApp;