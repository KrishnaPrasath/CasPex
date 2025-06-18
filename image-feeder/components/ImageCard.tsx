import { Character } from "@app/lib/types";
import Image from 'next/image'

export default function ImageCard(props: {character: Character}) {
    const {character} = props;
    
    return <div className="flex flex-col gap-2">
            <Image className="rounded-lg hover:drop-shadow-2xl" width={150} height={150} src={character.image} alt={character.name}></Image>
        <p className="whitespace-normal overflow-ellipsis">{character.name}</p>
    </div>;
};