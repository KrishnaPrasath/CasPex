import { JSX, RefObject } from "react";

export default function LoadMore(props: {ref: RefObject<HTMLDivElement | null>, isValidating: boolean, loader?: JSX.Element}){
    const {ref, isValidating, loader} = props;
    return <div ref={ref} className="flex justify-center items-center text-xs text-gray-500">
    {isValidating ? (loader ? loader : 'Loading more...') : 'Scroll to load more'}
  </div>
}