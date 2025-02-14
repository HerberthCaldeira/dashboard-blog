import { useFormContext } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  name: string;
  label: string;
  type?: "text" | "email" | "time" | "password";
  placeholder?: string;
  className?: string;
}

export default function MyInput({
  name,
  label,
  type,
  placeholder,
  className,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Label
        htmlFor={name}
        className={errors?.[name] ? "text-destructive" : ""}
      >
        {label}
      </Label>
      <Input
        className={className + (errors?.[name] ? " border-red-500" : "")}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className="text-destructive">{message}</p>}
      />
    </div>
  );
}
