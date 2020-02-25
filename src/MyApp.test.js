import React from 'react';
import {mount} from "enzyme";
import MyApp from "./MyApp";

const setup = (mockProps) => {
    const props = {...mockProps};

    // wrapper instance around rendered output
    const enzymeWrapper = mount(<MyApp {...props} />);
    enzymeWrapper.update();

    return {
        props,
        enzymeWrapper
    };
};

describe('<MyApp>', ()=> {

    it('should update state on correct guess', () => {

        // Setup wrapper and props
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.instance().handleGuess(true);

        expect(enzymeWrapper.state("correctGuesses")).toEqual(1);
        expect(enzymeWrapper.state("totalGuesses")).toEqual(1);
        expect(enzymeWrapper.state("isResultDialogOpen")).toEqual(true);
        expect(enzymeWrapper.state("wasLastGuessCorrect")).toEqual(true);
    });

    it('should update state on incorrect guess', () => {

        // Setup wrapper and props
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.instance().handleGuess(false);

        expect(enzymeWrapper.state("correctGuesses")).toEqual(0);
        expect(enzymeWrapper.state("totalGuesses")).toEqual(1);
        expect(enzymeWrapper.state("isResultDialogOpen")).toEqual(true);
        expect(enzymeWrapper.state("wasLastGuessCorrect")).toEqual(false);
    });

    it('should update state on update options count', () => {

        // Setup wrapper and props
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.instance().handleUpdateOptionsCount(5);
        expect(enzymeWrapper.state().optionsCount).toEqual(5);
    });

    it('should update state on reset game', () => {

        // Setup wrapper and props
        const {enzymeWrapper, props} = setup();

        enzymeWrapper.instance().resetGame();
        expect(enzymeWrapper.state().correctGuesses).toEqual(0);
        expect(enzymeWrapper.state().totalGuesses).toEqual(0);
        expect(enzymeWrapper.state().isResultDialogOpen).toEqual(false);
    });

})