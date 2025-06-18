import { BASE_URL } from "@app/lib/constants";
import { Episode } from "@app/lib/types";
import {  useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";

export default function useInfiniteScroll(props: {slug: string, loadIncrement?: number}) {
    const {slug, loadIncrement} = props;

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // TODO: can I control initial load?
    const getKey = (pageIndex: number, previousPageData: {info: {next: boolean}, results: Episode[]}) => {
        if (previousPageData && !previousPageData.info?.next) return null;
        return  `${BASE_URL}/${slug}?page=${pageIndex + (loadIncrement || 1)}`; // incrementing by 2, cuz we have 0th/1st data fetched from server
    };

    const { data, error, size, setSize, isValidating } = useSWRInfinite(
        getKey,
        fetcher,
        { initialSize: 0,revalidateFirstPage: false } // Prevent revalidation of the first page
    );

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
          setSize(size + 1); // Load the next page
        }
      };

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
    return {
        data, 
        error, 
        isValidating,
        loadMoreRef,
        handleScroll //pass this to the scrollable element
    }
}