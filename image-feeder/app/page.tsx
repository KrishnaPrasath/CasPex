// export const dynamic = 'force-dynamic'; // disables static caching

import ImageGrid from "@app/components/ImageGrid";
import SidebarFilter from "@app/components/SidebarFilters";
import { fetchCharacters, fetchEpisode } from "@app/lib/api";

const Page = async() => {  
    const characters = await fetchCharacters();
    const episodes = await fetchEpisode();  
    return <>
        <div className="flex gap-4 border-2 max-h-screen rounded-lg drop-shadow-2xl">
            <SidebarFilter episodes={episodes}/>
            <div className="flex-2 overflow-y-auto"><ImageGrid initialCharacterData={characters}/></div>
        </div>
    </>;
};

export default Page;