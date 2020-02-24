import {Player} from "./definitions/commonTypes";

export const getRandomPlayers = (list: Array<Player>, count: number): Array<Player> => {

    let result: Array<Player> = [];
    let filteredList = [...list];


    while (result.length < count) {
        let option: Player = filteredList[Math.floor(Math.random() * filteredList.length)];
        result.push(option);
        filteredList = filteredList.filter((p: Player) => p.id !== option.id);
    }

    return result;
};