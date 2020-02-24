import React from "react";
import {PageFooter} from "./PageFooter";
import { mount } from "enzyme";


const setup = (correctGuesses, totalGuesses) => {

    // Sample props for <PageFooter />
    const props = {
        correctGuesses,
        totalGuesses
    };

    // wrapper instance around rendered output
    const enzymeWrapper = mount(<PageFooter {...props} />);
    enzymeWrapper.update();

    return {
        props,
        enzymeWrapper
    };
};

describe("<PageFooter />", () => {
    // Setup wrapper and props
    const {enzymeWrapper} = setup(5, 15);

    it("Passes props correctly", () => {
        expect(enzymeWrapper.props().correctGuesses).toEqual(5);
        expect(enzymeWrapper.props().totalGuesses).toEqual(15);
    });

    it("Should render the correct guesses", () => {

        let firstSpan = enzymeWrapper.find("span").first();
        expect(firstSpan.text()).toMatch("Correct Guesses: 5");
    });

    it ("should render the total guesses", () => {

        let secondSpan = enzymeWrapper.find("span").at(1);
        expect(secondSpan.text()).toMatch("Total Guesses: 15");
    });

    if("Should render the win %", () => {
        let lastSpan = enzymeWrapper.find("span").last();
        expect(lastSpan.text()).toMatch("Win %: 0.333");
    });
});