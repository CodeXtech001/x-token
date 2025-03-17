import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-black text-white px-6 py-6">
            <div className="relative mb-8">
            <LoaderCircle className="w-16 h-16 animate-spin text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">
            Waiting for Payment
            </h3>
            <p className="text-gray-400 text-center max-w-md mb-8">
            Order is processing...
            </p>
            <div className={`min-h-[14rem] max-w-[450px] w-full list-none`}>
          </div>
        </div>
    </div>
  );
}
