"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, SearchIcon, Loader2, ChevronRight, ChevronLeft } from "lucide-react"; // Added arrows
import MapComponent from "@/app/MapComponent";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [coordinates, setCoordinates] = useState<{ lat: string, lon: string } | null>(null);
    const [loading, setLoading] = useState(false); // Controls the "Searching..." message
    const [highlightedArea, setHighlightedArea] = useState("");
    const [sidebarPage, setSidebarPage] = useState(1); // Toggle between pages (1: Links, 2: Locations)

    const handleSearch = async () => {
        if (searchQuery.trim() === "") return;

        console.log("Searching for what you need! Please hold :) :", searchQuery);
       setLoading(true); // Show "Searching..." for exactly 3 seconds

        try {
            const response = await fetch("http://localhost:8000/api/computeNeighbourhood/", {
                credentials: 'include',
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: searchQuery })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Assign return value to a variable
            console.log("Search results:", data);
            setHighlightedArea(data);

            setLoading(false);

        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
                        <Loader2 className="animate-spin h-6 w-6 text-blue-600" />
                        <p className="text-lg font-semibold">Searching...</p>
                    </div>
                </div>
            )}
            {/* Sidebar */}
            <aside className="w-80 h-screen bg-white p-5 shadow-md fixed left-0 top-0 overflow-y-auto z-50">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-center">🌍 {sidebarPage === 1 ? "Immigration Resources" : "Toronto Locations"}</h2>
                    <div className="flex space-x-2">
                        {sidebarPage > 1 && (
                            <button onClick={() => setSidebarPage(1)}
                                    className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                                <ChevronLeft size={20}/>
                            </button>
                        )}
                        {sidebarPage < 2 && (
                            <button onClick={() => setSidebarPage(2)}
                                    className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                                <ChevronRight size={20}/>
                            </button>
                        )}
                    </div>
                </div>

                {sidebarPage === 1 ? (
                    <>
                        <p className="text-gray-700 text-center mb-4">Helpful resources for newcomers in Canada.</p>
                        <ul className="space-y-2">
                            <li><a
                                href="https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants.html"
                                target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🇨🇦
                                Government of Canada - New Immigrants</a></li>
                            <li><a href="https://settlement.org" target="_blank" rel="noopener noreferrer"
                                   className="text-blue-600 hover:underline">🏠 Settlement.org - Housing, Jobs, and
                                Services</a></li>
                            <li><a href="https://www.jobbank.gc.ca/findajob/resources/newcomers" target="_blank"
                                   rel="noopener noreferrer" className="text-blue-600 hover:underline">💼 Job Bank for
                                Newcomers</a></li>
                            <li><a href="https://www.canada.ca/en/public-health/services/health-care-system.html"
                                   target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🏥
                                Healthcare System in Canada</a></li>
                            <li><a href="https://www.legalaid.on.ca/en/getting-legal-help/immigration-and-refugee-law/"
                                   target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">⚖️
                                Legal Aid for Immigrants & Refugees</a></li>
                            <li><a href="https://www.cic.gc.ca/english/newcomers/after-immigration.asp" target="_blank"
                                   rel="noopener noreferrer" className="text-blue-600 hover:underline">📜 Things to Do
                                After Immigration</a></li>
                            <li><a href="https://www.ontario.ca/page/education-newcomers" target="_blank"
                                   rel="noopener noreferrer" className="text-blue-600 hover:underline">🎓 Education for
                                Newcomers</a></li>
                            <li><a
                                href="https://www.canada.ca/en/financial-consumer-agency/services/newcomers-managing-money.html"
                                target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">💰
                                Managing Money & Banking in Canada</a></li>
                            <li><a href="https://www.canada.ca/en/employment-social-development/services/sin/apply.html"
                                   target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🔢
                                Apply for a Social Insurance Number (SIN)</a></li>
                        </ul>
                    </>
                ) : (
                    <>
                        <p className="text-gray-700 text-center mb-4">Explore famous locations in Toronto.</p>
                        <ul className="space-y-2">
                            <li>📍 <strong>CN Tower:</strong> One of the tallest towers in the world, offering stunning
                                views.
                            </li>
                            <li>🏛 <strong>Royal Ontario Museum:</strong> A mix of history, culture, and stunning
                                architecture.
                            </li>
                            <li>🌲 <strong>High Park:</strong> A beautiful park with walking trails, a zoo, and cherry
                                blossoms in spring.
                            </li>
                            <li>🛍 <strong>Kensington Market:</strong> A vibrant and diverse neighborhood known for its
                                shops and food.
                            </li>
                            <li>🎭 <strong>Distillery District:</strong> Historic area filled with art galleries, cafes,
                                and theaters.
                            </li>
                        </ul>
                    </>
                )}
            </aside>

            {/* Background Map */}
            <div className="w-screen h-screen absolute inset-x-0 inset-y-0 -z-10">
                <MapComponent areaName={highlightedArea}/>
            </div>
            <div className="absolute z-40 w-screen h-screen pointer-events-none">
                <div className="absolute bottom-10 right-10 mt-2 w-96 bg-white h-auto p-5 rounded-lg drop-shadow-2xl pointer-events-auto flex flex-col items-center">
                    {/* Welcome Message */}
                    <h1 className="font-sans text-2xl text-center mb-3">Hello and Welcome Home!</h1>
                    {/* Canadian Flag Image */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg"
                        alt="Canadian Flag"
                        className="w-16 h-12 mb-4"
                    />

                    <p className="text-gray-600 text-center mb-4">
                        Tell us about yourself and we'll help you find the perfect place to call home.
                    </p>

                    <div className="relative w-full">
                        <Input className="peer ps-9 pe-9" placeholder="Search..." type="search" value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               onKeyDown={(e) => e.key === "Enter" && handleSearch()}/>
                        <div
                            className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <SearchIcon size={16}/>
                        </div>
                        <button
                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Submit search"
                            type="button"
                            onClick={handleSearch}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <ArrowRightIcon size={16} />}
                        </button>
                    </div>

                    {/* Added Previous Message Below Search Bar */}
                    <div className="mt-5 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-lg font-semibold text-center mb-2">🛬 New to Canada?</h2>
                        <p className="text-sm text-gray-700 text-center">
                            Explore essential services, housing, healthcare, and employment opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

