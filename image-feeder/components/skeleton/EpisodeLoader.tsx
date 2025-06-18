import { Skeleton } from "@app/components/ui/skeleton"

export function EpisodeLoader() {
  return (
    <div className="w-full flex flex-col items-center space-x-4 p-2 bg-purple-200 rounded-lg mx-2">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
