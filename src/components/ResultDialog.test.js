import React from 'react';
import {shallow} from "enzyme";
import {ResultDialog} from "./ResultDialog";
import {Button, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";

const setupRandom = (mockProps) => {
    const props = {...mockProps};

    // wrapper instance around rendered output
    const enzymeWrapper = shallow(<ResultDialog {...props} />);
    enzymeWrapper.update();

    return {
        props,
        enzymeWrapper
    };
};

describe('<ResultDialog>', ()=> {

    let mockProps = {
        correctGuesses: 10,
        isDialogOpen: true,
        title: "This is a test",
        body: "This is only a test"
    };

    it('renders player dialog correctly with 10 correct guesses', () => {
        // Setup wrapper and props
        const {enzymeWrapper, props} = setupRandom(mockProps);

        // Test that the Title exists and is rendered correctly
        expect(enzymeWrapper.find(DialogTitle)).toHaveLength(1);
        expect(enzymeWrapper.find(DialogTitle).text()).toMatch(mockProps.title);

        // Test that the body exists and is rendered correctly
        expect(enzymeWrapper.find(DialogContent)).toHaveLength(1);
        expect(enzymeWrapper.find(DialogContent).text()).toMatch(mockProps.body);

        // Test that the actions exist and contains the correct number of buttons and the correct text
        expect(enzymeWrapper.find(DialogActions)).toHaveLength(1);
        expect(enzymeWrapper.find(DialogActions).find(Button)).toHaveLength(1);
        expect(enzymeWrapper.find(DialogActions).find(Button).text()).toMatch("Start Over");
    });

    it('renders player dialog correctly with fewer than 10 correct guesses', () => {
        // Setup wrapper and props
        mockProps.correctGuesses = 9;
        const {enzymeWrapper, props} = setupRandom(mockProps);

        // Test that the button text is correct
        expect(enzymeWrapper.find(DialogActions).find(Button).text()).toMatch("Continue");
    });


})