'use client';

import { Episode } from "@app/lib/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SidebadFilters(props: {episodes: Episode[] | null}) {
    const {episodes} = props;
    const [activeEpisode, setActiveEpisode] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
   

    const handleSelection = (id: number) => {
        if(id === activeEpisode) {
            setActiveEpisode(null);
        }else {
            setActiveEpisode(id);
        }
    }

    useEffect(() => {
        if(activeEpisode) {
            const params = new URLSearchParams(searchParams);
            params.set('episode', activeEpisode.toString());
            router.push(`/?${params.toString()}`);
        } else {
            router.replace('/');
        }
    }, [activeEpisode, router, searchParams])
    
    if(!episodes) {
        // TODO: fallback UI
        return <p>Episodes failed to fetch</p>
    }
    return <div className="overflow-y-auto flex flex-col">
    <p className="p-2">Episodes</p>
    <ul className="p-2 flex flex-col gap-2">
        {
            episodes.map(e => {
                return <li key={e.id} onClick={() => handleSelection(e.id)} className={`border rounded-lg p-2 whitespace-nowrap overflow-ellipsis hover:bg-gray-200 ${activeEpisode === e.id ? "bg-amber-200" : ""}`} >{e.name}</li>
            })
        }
        </ul>
    </div>
};