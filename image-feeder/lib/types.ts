export type Character = {
    id: number;
    name: string;
    image: string; //URL
    episode: string[]; //URL
}

export type Episode = {
    id: number;
    name: string;
    episode: string; //URL
    characters: string[]; //URL
}