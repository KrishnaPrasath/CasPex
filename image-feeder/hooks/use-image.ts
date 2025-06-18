// import { fetchEpisode } from "@app/lib/api";
import { useState, useEffect } from 'react';
import * as React from "react"
import { Character, Episode } from '../lib/types';
import { BASE_URL } from '@app/lib/constants';
import { fetchCharacters } from '@app/lib/api';


export function useImage(props: {episodeID: string | null; initialCharacterData: Character[] | null}) {
    // fetch based on query param
    const {episodeID, initialCharacterData} = props;
    const [loading, setLoading] = useState(false);
    const [characters, setCharacters] = React.useState<Character[]>(initialCharacterData || []);

    useEffect(() => {
        const fetchEpisodeById = async (_episodeId: string) => {
          setLoading(true);
          const res = await fetch(`${BASE_URL}/episode/${_episodeId}`);
          const data: Episode = await res.json();
    
        //   const characterData = await Promise.all(
        //     // data.characters.map((url: string) => fetch(url).then((res) => res.json()))
        //   );
        const characterIDs = data.characters.map(ch => {
            return ch.split("/").pop();
        }).filter((id): id is string => Boolean(id));
        const characters = await fetchCharacters(characterIDs);
        if(characters) {
            setCharacters(characters);
        }
        
        //   setCharacters(characterData);
          setLoading(false);
        };
        if(episodeID){
            fetchEpisodeById(episodeID);
        } else {
            setCharacters(initialCharacterData || []);
        }
        // fetchCharacters();
      }, [episodeID, initialCharacterData]);
    
  return {
    characters
  }
}
