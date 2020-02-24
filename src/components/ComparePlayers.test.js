import React from 'react';
import {mount, shallow} from "enzyme";
import {getRandomPlayers} from "../utils";
import {mockResponse} from "../__mock__";
import {ComparePlayers} from "./ComparePlayers";
import {PlayerCard} from "./PlayerCard";

const setupRandom = () => {

    // Magic number 5 is arbitrary defined. It was chosen to limit the max options to 1/5 of the total players
    let maxOptions = mockResponse.players.length / 5;

    // Creates a random number to assign to the optionsCount
    let randOptionsCount = Math.floor(Math.random() * maxOptions);

    // Need to make sure that the optionsCount is a minimum of 2
    randOptionsCount = randOptionsCount < 2 ? 2 : randOptionsCount;

    const props = {
        players: getRandomPlayers(mockResponse.players, randOptionsCount),
        optionsCount: randOptionsCount
    };

    // wrapper instance around rendered output
    const enzymeWrapper = shallow(<ComparePlayers {...props} />);
    enzymeWrapper.update();

    return {
        props,
        enzymeWrapper
    };
};

describe('<ComparePlayers>', ()=> {

    // Setup wrapper and props
    const {enzymeWrapper, props} = setupRandom();

    it('renders correct num of cards', () => {
        expect(enzymeWrapper.find(PlayerCard)).toHaveLength(props.optionsCount);
    });
})