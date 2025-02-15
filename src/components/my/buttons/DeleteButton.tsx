import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface DeleteWithAlertButtonProps {
  toolTipText?: string;
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  children?: ReactNode;
  onDelete: () => void;
}

const SwalInstance = withReactContent(Swal);

export function DeleteButton({
  toolTipText = "Delete",
  title = "Delete item",
  text = "Are you sure?",
  icon,
  confirmButtonText = "Delete",
  children,
  onDelete,
}: DeleteWithAlertButtonProps) {
  const showAlert = () => {
    SwalInstance.fire({
      title,
      html: <div>{text}</div>,
      icon,
      confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
      }
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            className=""
            onClick={showAlert}
          >
            <TrashIcon /> {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{toolTipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
