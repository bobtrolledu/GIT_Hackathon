"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, User, Loader2, ChevronRight, ChevronLeft, MapPin, Link, Mountain  } from "lucide-react"; // Added arrows
import MapComponent from "@/app/MapComponent";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false); // Controls the "Searching..." message
    const [highlightedArea1, setHighlightedArea1] = useState("");
    const [highlightedArea2, setHighlightedArea2] = useState("");
    const [highlightedArea3, setHighlightedArea3] = useState("");
    const { toast } = useToast();

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
            const list_data = data.split(", ")

            const data1 = list_data[0]
            const data2 = list_data[1]
            const data3 = list_data[2]

            console.log("Search results:", data);

            setHighlightedArea1(data1);
            setHighlightedArea2(data2);
            setHighlightedArea3(data3);

            setLoading(false);

        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex dark">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="bg-muted p-6 rounded-lg shadow-lg flex items-center space-x-3">
                        <Loader2 className="animate-spin h-6 w-6 text-blue-600" />
                        <p className="text-lg font-semibold">Searching...</p>
                    </div>
                </div>
            )}

            <img src="/WelcomeHomeLogo.png" className="absolute top-2 left-20 z-100 w-auto h-20"/>

            {/* Sidebar */}
            <div className="w-2/9 h-screen bg-white p-5 fixed left-0 top-0 overflow-y-auto z-5 pt-30">

                <Tabs defaultValue="tab-1">
                  <ScrollArea>
                    <TabsList className="before:bg-border relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
                      <TabsTrigger
                        value="tab-1"
                        className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                      >
                        <Link className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                        Links
                      </TabsTrigger>
                      <TabsTrigger
                        value="tab-2"
                        className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                      >
                        <MapPin className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                        Locations
                      </TabsTrigger>
                      <TabsTrigger
                        value="tab-3"
                        className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                      >
                        <Mountain className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                        Landmarks
                      </TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                    <TabsContent value="tab-1">
                        <p className="text-gray-700 text-center mb-4">Helpful resources for newcomers to Canada.</p>
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
                    </TabsContent>
                    <TabsContent value="tab-2">

                    </TabsContent>
                    <TabsContent value="tab-3">
                        <p className="text-gray-700 text-center mb-4">Explore famous landmarks in Toronto.</p>
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
                            <li>🎡 <strong>Canada's Wonderland:</strong> A thrilling amusement park featuring roller
                                coasters,
                                water rides, and entertainment.
                            </li>
                            <li>🎨 <strong>Art Gallery of Ontario:</strong> A world-class gallery showcasing Canadian and
                                international art.
                            </li>
                        </ul>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Background Map */}
            <div className="w-screen h-screen absolute inset-x-0 inset-y-0 -z-10">
                <MapComponent areaName1={highlightedArea1} areaName2={highlightedArea2} areaName3={highlightedArea3}/>
            </div>
            <div className="absolute z-40 w-screen h-screen pointer-events-none">
                <div className="absolute top-0 right-0 w-screen h-25 bg-white pointer-events-auto flex flex-row-reverse items-center z-40 shadow-lg">


                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg"
                        alt="Canadian Flag"
                        className="w-16 h-auto mr-10 ml-10"
                    />

                    <div className="relative w-3/7 mr-80">
                        <Input className="peer ps-9 pe-9" placeholder="Tell us about yourself and we'll help you find the perfect place to call home." type="search" value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               onKeyDown={(e) => e.key === "Enter" && handleSearch()}/>
                        <div
                            className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <User size={16}/>
                        </div>
                        <button
                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Submit search"
                            type="button"
                            onClick={handleSearch}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5"/> : <ArrowRightIcon size={16}/>}
                        </button>
                    </div>


                    {/*
                    <div className="mt-5 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-lg font-semibold text-center mb-2">🛬 New to Canada?</h2>
                        <p className="text-sm text-gray-700 text-center">
                            Explore essential services, housing, healthcare, and employment opportunities.
                        </p>
                    </div>
                    */}
                </div>
            </div>
        </div>
    );
}

