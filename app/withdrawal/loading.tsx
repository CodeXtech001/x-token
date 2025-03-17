import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center text-2xl font-semibold text-white">
      <span className="flex items-center gap-2">
        Loading...
        <LoaderCircle className="w-6 h-6 text-blue-400 animate-spin" />
      </span>
    </div>
  );
}