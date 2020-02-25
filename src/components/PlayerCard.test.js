import React from 'react';
import {mount, shallow} from "enzyme";
import {mockResponse} from "../__mock__";
import {PlayerCard} from "./PlayerCard";
import {Card} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const setup = () => {
    const props = {
        player: mockResponse.players[0],
        team: mockResponse.teams[0]
    };

    // wrapper instance around rendered output
    const enzymeWrapper = mount(<PlayerCard {...props} />);
    enzymeWrapper.update();

    return {
        props,
        enzymeWrapper
    };
};

describe('<PlayerCard>', ()=> {

    // Setup wrapper and props
    const {enzymeWrapper, props} = setup();

    it('renders player card correctly', () => {
        expect(enzymeWrapper.find(Card)).toHaveLength(1);
        expect(enzymeWrapper.find(CardMedia)).toHaveLength(1);
        expect(enzymeWrapper.find(CardContent)).toHaveLength(1);
        expect(enzymeWrapper.find(CardContent).find("span").first().text()).toMatch(`${props.player.first_name} ${props.player.last_name}`);
        expect(enzymeWrapper.find(CardContent).find("span").last().text()).toMatch(`${props.team.full_name}`);
    });
})