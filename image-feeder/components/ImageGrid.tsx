'use client';

import ImageCard from "./ImageCard";
import { Character } from '../lib/types';
import { useSearchParams } from "next/navigation";
import { useImage } from "@app/hooks/use-image";
import LoadMore from "./LoadMore";
import useInfiniteScroll from "@app/hooks/use-infinite";

export default function ImageGrid(props: {initialCharacterData: Character[] | null}) {
    const {initialCharacterData} = props;
    const searchParams = useSearchParams();
    const queriedEpisode = searchParams.get('episode');

    const {loadMoreRef, isValidating, data, handleScroll} = useInfiniteScroll({loadIncrement: 2, slug: "character"});

    const {characters} = useImage({episodeID: queriedEpisode, initialCharacterData});
    const renderData = [
        ...(characters || []),
        ...(data ? data.flatMap((page) => page.results) : []),
    ];

    if(!renderData) return null;
    return <div className="overflow-y-auto" onScroll={handleScroll}>
        <div className="grid grid-cols-5 gap-2 p-2 ">
            {renderData.map(char => {
                return <ImageCard key={char.id} character={char}/>
                })}
        </div>
        <LoadMore ref={loadMoreRef} isValidating={isValidating}/>
    </div>;
};