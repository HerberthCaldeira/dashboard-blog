import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type CreateButtonProps = {
  to: string;
  children: string;
};

export function CreateButton({ children, to }: CreateButtonProps) {
  return (
    <Link to={to}>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" /> {children}
      </Button>
    </Link>
  );
}
