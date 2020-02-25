import React from "react";
import {Container, Grid} from "@material-ui/core";
import {ComparePlayers} from "./components/ComparePlayers";
import {PageFooter} from "./components/PageFooter";
import {PageHeader} from "./components/PageHeader";
import {ResultDialog} from "./components/ResultDialog";
import DataResponse, {Player, Team} from "./definitions/commonTypes";
import {getRandomPlayers} from "./utils";

interface AppState {
    correctGuesses: number;
    totalGuesses: number;
    optionsCount: number;
    players: Array<Player>;
    teams: Array<Team>;
    randomPlayers: Array<Player>;
    isResultDialogOpen: boolean;
    wasLastGuessCorrect: boolean;
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
            wasLastGuessCorrect: false
        };
    }

    /**
     * When the component mounts make the request for the data and store in local state
     */
    async componentDidMount() {
        // Makes the request
        const response: Response = await fetch("https://gist.githubusercontent.com/liamjdouglas/bb40ee8721f1a9313c22c6ea0851a105/raw/6b6fc89d55ebe4d9b05c1469349af33651d7e7f1/Player.json");
        // extracts the body of the response as json
        const data: DataResponse = await response.json();
        // sets the state of the app
        await this.setState({
            players: data.players,
            teams: data.teams,
            randomPlayers: getRandomPlayers(data.players, this.state.optionsCount)
        });
    }

    /**
     * Gets the title for the result dialog
     */
    get resultDialogTitle(): string {
        return this.state.wasLastGuessCorrect ? "Correct" : "Wrong"
    };


    /**
     * Create the body element for the result dialog
     * Will display a messsage to the user, the current score, and the current win%
     */
    get resultDialogBody(): JSX.Element {
        let message: string ="";
        if (this.state.wasLastGuessCorrect) {
            switch (this.state.correctGuesses) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    message = "Good job, to win the game guess correctly 10 times.";
                    break;
                case 7:
                case 8:
                case 9:
                    message = `You're almost there, only ${10 - this.state.correctGuesses} to go!`;
                    break;
                case 10:
                    message = `You guessed right 10 times! To start a new game click the start over button below and 
                                for a more challenging experience use the slider at the top of the page to choose more options`;
                    break;
            }
        } else {
            message = "Don't get discouraged, keep guessing!";
        }

        return (
            <div>
                <p>{message}</p>
                <p><strong>Score:</strong> {this.state.correctGuesses}</p>
                <p><strong>Win %:</strong> {(this.state.correctGuesses / this.state.totalGuesses).toFixed(3)}</p>
            </div>
        );
    }


    /**
     * Handler for when a user updates the slider
     * If the count is unchanged dont update state
     * @param count
     */
    handleUpdateOptionsCount = (count: number) => {
        if (count === this.state.optionsCount)
            return;

        // Update the randomPlayers in the local store
        this.setState({
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
                correctGuesses: this.state.correctGuesses + 1,
                totalGuesses: this.state.totalGuesses + 1,
                isResultDialogOpen: true,
                wasLastGuessCorrect: true
            })
        } else {
            this.setState({
                totalGuesses: this.state.totalGuesses + 1,
                isResultDialogOpen: true,
                wasLastGuessCorrect: false
            })
        }
    };

    /**
     * Maintain current state of the game but refresh the options (players) and close any open dialog
     */
    refreshGame = () => {
        this.setState({
            isResultDialogOpen: false,
            randomPlayers: getRandomPlayers(this.state.players, this.state.optionsCount)
        });
    };

    /**
     * Reset the guesses counts back to 0 and refresh the options
     */
    resetGame = () => {
        this.setState({
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
                            body={this.resultDialogBody}
                            title={this.resultDialogTitle}
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
                                    teams={this.state.teams}
                                />
                            }
                        </Grid>
                        <Grid container spacing={3}>
                            <PageFooter correctGuesses={this.state.correctGuesses}
                                        totalGuesses={this.state.totalGuesses}/>
                        </Grid>

                    </Container>
                )}
            </React.Fragment>
        )
    }
}

export default MyApp;