import React from "react";
import { mount } from "enzyme";
import {PageHeader} from "./PageHeader";


const setup = (maxOptions, optionsCount) => {

    // Sample props for <PageFooter />
    const props = {
        maxOptions,
        optionsCount
    };

    // wrapper instance around rendered output
    const enzymeWrapper = mount(<PageHeader {...props} />);
    enzymeWrapper.update();

    return {
        props,
        enzymeWrapper
    };
};

describe("<PageHeader />", () => {
    // Setup wrapper and props
    const {enzymeWrapper} = setup(15, 5);

    it("Passes props correctly", () => {
        expect(enzymeWrapper.props().maxOptions).toEqual(15);
        expect(enzymeWrapper.props().optionsCount).toEqual(5);
    });

});