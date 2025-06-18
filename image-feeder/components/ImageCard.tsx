import { Character } from "@app/lib/types";
import Image from 'next/image'

export default function ImageCard(props: {character: Character}) {
    const {character} = props;
    
    return <div className="flex flex-col gap-4 border border-s-purple-200 rounded-lg hover:bg-purple-500 hover:text-white hover:drop-shadow-xl">
            <Image className="rounded-t-lg" width={350} height={250} src={character.image} alt={character.name}></Image>
        <div className="whitespace-normal overflow-ellipsis font-bold text-center pb-2">{character.name}</div>
    </div>;
};