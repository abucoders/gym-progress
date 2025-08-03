import { LoaderPinwheel } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const FillLoading = () => {
  return (
    <Skeleton className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm opacity-20">
      <div className="flex flex-col items-center gap-4">
        <LoaderPinwheel className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </Skeleton>
  );
};

export default FillLoading;
