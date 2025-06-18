import { BASE_URL } from "./constants";
import { Character, Episode } from "./types";


export const fetchCharacters = async(characterList?: string[]):Promise<Character[] | null> => {
    try {
        let fetch_url = `${BASE_URL}/character`;
        if(characterList?.length){
            fetch_url = fetch_url + `/${characterList}`
        }
        const characters = await fetch(fetch_url);    
        const data = await characters.json();
        return characterList?.length ? data : data.results;
    } catch (error) {
        console.error("Failed to fetch characters! >>", error);
        return null;
    }
}

export const fetchEpisode = async(id?: string):Promise<Episode[] | null> => {
    try {
        let fetch_url = `${BASE_URL}/episode`;
        if(id){
            fetch_url = fetch_url + `/${id}`
        }
        const episodes = await fetch(fetch_url);    
        const data = await episodes.json();
        return data.results;
    } catch (error) {
        console.error("Failed to fetch episodes! >>", error);
        return null;
    }
}