export interface Info {
    count: number;
    pages: number;
    next: string;
    prev?: any;
}

export interface EpisodeObject {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: Date;
}

export interface Episode {
    info: Info;
    results: EpisodeObject[];
}