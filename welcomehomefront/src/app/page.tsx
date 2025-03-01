"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useId, useState } from "react";
import MapComponent from "@/app/MapComponent";

export default function Home() {
    const id = useId();
    const [searchQuery, setMapSearchQuery] = useState("");
    

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            console.log("Search Submitted, please hold while we find you the best results!: ", searchQuery);

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const { lat, lon } = data[0]; // Extract latitude and longitude
                        console.log(`Coordinates: ${lat}, ${lon}`);
                    } else {
                        console.log("No results found.");
                    }
                })
                .catch(error => console.error("Error fetching search results:", error));
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center absolute z-50 w-screen h-screen pointer-events-none">
                <div className="mt-2 w-96 bg-white h-60 p-5 rounded-lg drop-shadow-2xl pointer-events-auto">
                    <h1 className="font-borel">Welcome Home</h1>
                    <div className="relative">
                        <Input
                            id={id}
                            className="peer ps-9 pe-9"
                            placeholder="Search..."
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setMapSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <SearchIcon size={16} />
                        </div>
                        <button
                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Submit search"
                            type="button"
                            onClick={handleSearch}
                        >
                            <ArrowRightIcon size={16} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-screen h-screen bg-green-700 absolute inset-x-0 z-0">
                <MapComponent />
            </div>
        </div>
    );
}

