import { Pencil2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type EditButtonProps = {
  to: string;
  children?: string;
};

export function EditButton({ children, to }: EditButtonProps) {
  return (
    <Link to={to}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"} size={"icon"} className="">
              <Pencil2Icon /> {children ?? ""}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
}
