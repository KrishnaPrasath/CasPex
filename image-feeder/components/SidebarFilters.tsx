'use client';

import { BASE_URL } from "@app/lib/constants";
import { Episode } from "@app/lib/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getKey = (pageIndex: number, previousPageData: {info: {next: boolean}, results: Episode[]}) => {
    if (previousPageData && !previousPageData.info?.next) return null;
    return  `${BASE_URL}/episode?page=${pageIndex + 2}`; // incrementing by 2, cuz we have 0th/1st data fetched from server
};

export default function SidebadFilters(props: {episodes: Episode[] | null}) {
    const {episodes} = props;
    const [activeEpisode, setActiveEpisode] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
   
    // SWR Infinite for paginated data
    const { data, error, size, setSize, isValidating } = useSWRInfinite(
        getKey,
        fetcher,
        { initialSize: 0,revalidateFirstPage: false } // Prevent revalidation of the first page
    );

    const renderData = [
        ...(episodes || []),
        ...(data ? data.flatMap((page) => page.results) : []),
    ];
    
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

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSize((prev) => prev + 1);
        }
      },
      {
        rootMargin: '100px',
      }
    );
    const refCurrent = loadMoreRef.current;

    if (refCurrent) {
      observer.observe(refCurrent);
    }

    return () => {
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
  }, [loadMoreRef, setSize]);
    

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
          setSize(size + 1); // Load the next page
        }
      };
    
    if(!episodes) {
        // TODO: fallback UI
        return <p>Episodes failed to fetch</p>
    }
    return <div className="overflow-y-auto flex flex-col" onScroll={handleScroll}>
    <p className="p-2">Episodes</p>
    <ul className="p-2 flex flex-col gap-2">
        {
            renderData.map(e => {
                return <li key={e.id} onClick={() => handleSelection(e.id)} className={`border rounded-lg p-2 whitespace-nowrap overflow-ellipsis hover:bg-gray-200 ${activeEpisode === e.id ? "bg-amber-200" : ""}`} >{e.name}</li>
            })
        }
    </ul>
    <div ref={loadMoreRef} className="h-8 flex justify-center items-center text-xs text-gray-500">
        {isValidating ? 'Loading more...' : 'Scroll to load more'}
      </div>

    </div>
};