"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SearchIcon } from "lucide-react";

interface NewSearchButtonProps {
  onClick: () => void; // Expecting a function that takes no arguments and returns nothing
}

export default function NewSearchButton({ onClick }: NewSearchButtonProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="New Search" onClick={onClick}>
            <SearchIcon size={16} aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">New Search</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
