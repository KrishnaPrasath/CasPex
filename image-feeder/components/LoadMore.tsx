import { RefObject } from "react";

export default function LoadMore(props: {ref: RefObject<HTMLDivElement | null>, isValidating: boolean}){
    const {ref, isValidating} = props;
    return <div ref={ref} className="h-8 flex justify-center items-center text-xs text-gray-500">
    {isValidating ? 'Loading more...' : 'Scroll to load more'}
  </div>
}