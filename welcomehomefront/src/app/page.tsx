"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, SearchIcon, Loader2, ChevronRight, ChevronLeft } from "lucide-react"; // Added arrows
import MapComponent from "@/app/MapComponent";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [coordinates, setCoordinates] = useState<{ lat: string, lon: string } | null>(null);
    const [highlightedArea, setHighlightedArea] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [sidebarPage, setSidebarPage] = useState(1); // Toggle between pages (1: Links, 2: Locations)

    const handleSearch = async () => {
        if (searchQuery.trim() === "") return;

        console.log("Searching for what you need! Please hold :) :", searchQuery);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 3000);

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();

            if (response.ok) {
                setCoordinates({ lat: data.latitude, lon: data.longitude });
                console.log(`Coordinates: ${data.latitude}, ${data.longitude}`);
                setHighlightedArea(data.areaName || "Unknown Location");
            } else {
                console.error("Search error:", data.error);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-80 h-screen bg-white p-5 shadow-md fixed left-0 top-0 overflow-y-auto z-50">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-center">🌍 {sidebarPage === 1 ? "Immigration Resources" : "Toronto Locations"}</h2>
                    <div className="flex space-x-2">
                        {sidebarPage > 1 && (
                            <button onClick={() => setSidebarPage(1)} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        {sidebarPage < 2 && (
                            <button onClick={() => setSidebarPage(2)} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                                <ChevronRight size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {sidebarPage === 1 ? (
                    <>
                        <p className="text-gray-700 text-center mb-4">Helpful resources for newcomers in Canada.</p>
                        <ul className="space-y-2">
                            <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🇨🇦 Government of Canada - New Immigrants</a></li>
                            <li><a href="https://settlement.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🏠 Settlement.org - Housing, Jobs, and Services</a></li>
                            <li><a href="https://www.jobbank.gc.ca/findajob/resources/newcomers" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">💼 Job Bank for Newcomers</a></li>
                            <li><a href="https://www.canada.ca/en/public-health/services/health-care-system.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🏥 Healthcare System in Canada</a></li>
                            <li><a href="https://www.legalaid.on.ca/en/getting-legal-help/immigration-and-refugee-law/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">⚖️ Legal Aid for Immigrants & Refugees</a></li>
                            <li><a href="https://www.cic.gc.ca/english/newcomers/after-immigration.asp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">📜 Things to Do After Immigration</a></li>
                            <li><a href="https://www.ontario.ca/page/education-newcomers" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🎓 Education for Newcomers</a></li>
                            <li><a href="https://www.canada.ca/en/financial-consumer-agency/services/newcomers-managing-money.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">💰 Managing Money & Banking in Canada</a></li>
                            <li><a href="https://www.canada.ca/en/employment-social-development/services/sin/apply.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🔢 Apply for a Social Insurance Number (SIN)</a></li>
                        </ul>
                    </>
                ) : (
                    <>
                        <p className="text-gray-700 text-center mb-4">Explore famous locations in Toronto.</p>
                        <ul className="space-y-2">
                            <li>📍 <strong>CN Tower:</strong> One of the tallest towers in the world, offering stunning views.</li>
                            <li>🏛 <strong>Royal Ontario Museum:</strong> A mix of history, culture, and stunning architecture.</li>
                            <li>🌲 <strong>High Park:</strong> A beautiful park with walking trails, a zoo, and cherry blossoms in spring.</li>
                            <li>🛍 <strong>Kensington Market:</strong> A vibrant and diverse neighborhood known for its shops and food.</li>
                            <li>🎭 <strong>Distillery District:</strong> Historic area filled with art galleries, cafes, and theaters.</li>
                        </ul>
                    </>
                )}
            </aside>

            {/* Background Map */}
            <div className="w-screen h-screen absolute inset-x-0 inset-y-0 -z-10">
                <MapComponent areaName={highlightedArea} />
            </div>

            {/* Main Content */}
            <div className="flex-grow ml-80">
                {/* Search Box */}
                <div className="flex items-center justify-center absolute z-40 w-screen h-screen pointer-events-none">
                    <div className="mt-2 w-[500px] h-[500px] bg-white p-5 rounded-lg drop-shadow-2xl pointer-events-auto">
                        <h1 className="font-sans text-2xl text-center mb-3">Welcome Home</h1>

                        {/* Small Canadian Flag */}
                        <img src="https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg" alt="Canadian Flag" className="w-12 h-8 mx-auto mb-2" />

                        <p className="text-gray-600 text-center mb-4">
                            Tell us about yourself and we'll help you find the perfect place to call home.
                        </p>

                        <div className="relative w-full">
                            <Input className="peer ps-9 pe-9" placeholder="Search..." type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
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
        </div>
    );
}
