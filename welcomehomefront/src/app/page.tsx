import {Input} from "@/components/ui/input";
import {ArrowRightIcon, SearchIcon} from "lucide-react";
import {useId} from "react";
import MapComponent from "@/app/MapComponent";

export default function Home() {
    const id = useId();
    return (
        <div>

            <div className="flex items-center flex-row-reverse h-50 absolute z-50 w-screen h-screen pointer-events-none">
                <div className="*:not-first:mt-2 w-96 bg-white w-70 h-200 p-12 rounded-lg drop-shadow-lg pointer-events-auto m-20">
                    <h1 className="font-borel">welcome home</h1>
                    <div className="relative">
                        <Input id={id} className="peer ps-9 pe-9" placeholder="Search..." type="search"/>
                        <div
                            className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <SearchIcon size={16}/>
                        </div>
                        <button
                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Submit search"
                            type="submit"
                        >
                            <ArrowRightIcon size={16} aria-hidden="true"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-screen h-screen bg-green-700 absolute inset-x-0 z-0">
                <MapComponent/>
            </div>

        </div>
    );
}
