import { Skeleton } from "@app/components/ui/skeleton"
import { CHARACTER_SKELETON_COUNT } from "@app/lib/constants";

export function CharacterLoader() {
  return (
    <div className="w-full grid grid-cols-5 items-center gap-2 space-x-4 p-2">
      {Array.from({ length: CHARACTER_SKELETON_COUNT }, (_, i) => (
        <div key={i} className="space-y-2 bg-purple-200 p-2 rounded-lg w-full">
          <Skeleton className="h-32 p-2" />
          <Skeleton className="h-4 w-[100px] p-2" />
        </div>
      ))}
    </div>
  )
}
