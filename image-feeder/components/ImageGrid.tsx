'use client';

import ImageCard from "./ImageCard";
import { Character } from '../lib/types';
import { useSearchParams } from "next/navigation";
import { useImage } from "@app/hooks/use-image";

export default function ImageGrid(props: {initialCharacterData: Character[] | null}) {
    const {initialCharacterData} = props;
    const searchParams = useSearchParams();
    const queriedEpisode = searchParams.get('episode')

    const {characters} = useImage({episodeID: queriedEpisode, initialCharacterData});
    if(!characters) return null;
    return <div className="overflow-y-auto">
        <div className="grid grid-cols-5 gap-2 p-2 ">
            {characters.map(char => {
                return <ImageCard key={char.id} character={char}/>
                })}
        </div>
    </div>;
};