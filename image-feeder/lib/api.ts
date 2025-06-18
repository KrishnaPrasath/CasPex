import { BASE_URL, INITIAL_CHARACTER_FETCH_COUNT } from "./constants";
import { Character, Episode } from "./types";


export const fetchCharacters = async(characterList?: string[]):Promise<Character[] | null> => {
    try {
        let fetch_url = `${BASE_URL}/character`;
        if(characterList?.length){
            fetch_url = fetch_url + `/${characterList}`
        } else {
            const numbers = Array.from({ length: INITIAL_CHARACTER_FETCH_COUNT }, (_, index) => index + 1).join(",");

            fetch_url = fetch_url + `/${numbers}`
        }
        const response = await fetch(fetch_url);   
        if (!response.ok) throw new Error(`Failed to fetch character: ${response.status}`); 
        const data = await response.json();
        return  data;
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
        const response = await fetch(fetch_url);    
        if (!response.ok) throw new Error(`Failed to fetch episode: ${response.status}`); 
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Failed to fetch episodes! >>", error);
        return null;
    }
}