export default interface DataResponse {
    fixtures: Array<Fixture>;
    players: Array<Player>;
    teams: Array<Team>;
}

export interface Player {
    first_name: string;
    fixture: Fixture;
    fppg: number;
    id: string;
    images: {default: DefaultImage};
    injured: boolean;
    injury_details: unknown;
    injury_status: unknown;
    last_name: string;
    news: unknown;
    played: number;
    player_card_url: string;
    position: Position;
    removed: boolean;
    salary: number;
    starting_order: unknown;
    team: ReferenceTeam
}

type Position = "PF" | "PG" | "C" | "SF" | "SG"

interface DefaultImage {
    height: number;
    url: string;
    width: number;
}

interface ReferenceTeam {
    _members: Array<string>;
    _ref: string;
}

export interface Team {
    city: string;
    code: string;
    full_name: string;
    id: string;
    name: string;
}

export interface Fixture {
    away_team: FixtureTeam;
    home_team: FixtureTeam;
    id: string;
    sport: Sport;
    start_date: string;
    status: unknown;
}

type Sport = "MLB" | "NBA" | "NFL" | "NHL";

interface FixtureTeam {
    score: number;
    team: ReferenceTeam;
}
