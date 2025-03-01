"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, SearchIcon, Loader2 } from "lucide-react";
import MapComponent from "@/app/MapComponent";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [coordinates, setCoordinates] = useState<{ lat: string, lon: string } | null>(null);
    const [loading, setLoading] = useState(false); // Controls the "Searching..." message
    const [highlightedArea, setHighlightedArea] = useState("");


    const handleSearch = async () => {
        if (searchQuery.trim() === "") return;

        console.log("Searching for:", searchQuery);
        setLoading(true); // Show "Searching..." for exactly 3 seconds

        setTimeout(() => {
            setLoading(false); // Remove "Searching..." after 3 seconds
        }, 500);

        try {
            setHighlightedArea(searchQuery);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div>
            {/* Loading Overlay (remains for 3 seconds, regardless of API call) */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
                        <Loader2 className="animate-spin h-6 w-6 text-blue-600" />
                        <p className="text-lg font-semibold">Searching...</p>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-center absolute z-40 w-screen h-screen pointer-events-none">
                <div className="mt-2 w-96 bg-white h-80 p-5 rounded-lg drop-shadow-2xl pointer-events-auto flex flex-col items-center">
                    {/* Welcome Message */}
                    <h1 className="font-sans text-2xl text-center mb-3">Hello and Welcome Home!</h1>
                    <p className="text-black-600 text-center mb-4">
                        Please search any inquiry you may have!
                    </p>

                    {/* Canadian Flag Image */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg"
                        alt="Canadian Flag"
                        className="w-16 h-12 mb-4"
                    />

                    <div className="relative w-full">
                        <Input
                            className="peer ps-9 pe-9"
                            placeholder="Search..."
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <SearchIcon size={16} />
                        </div>
                        <button
                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Submit search"
                            type="button"
                            onClick={handleSearch}
                            disabled={loading} // Disable button while loading
                        >
                            <ArrowRightIcon size={16} />
                        </button>
                    </div>

                    {coordinates && (
                        <p className="text-center mt-3">Coordinates: {coordinates.lat}, {coordinates.lon}</p>
                    )}
                </div>
            </div>
            <div className="w-screen h-screen bg-green-700 absolute inset-x-0 z-0">
                <MapComponent areaName={highlightedArea} />
            </div>
        </div>
    );
}
