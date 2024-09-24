import { useFormContext } from "react-hook-form";
import { InputProps } from "./types/fieldsTypes";

import { ErrorMessage } from "@hookform/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MyInput({
  name,
  label,
  type,
  placeholder,
  errors,
  className,
}: InputProps) {
  const { register } = useFormContext();
  //console.log("MyInput::errors", errors);

  return (
    <div>
      <Label
        htmlFor={name}
        className={errors?.[name] ? "text-destructive" : ""}
      >
        {label}
      </Label>
      <Input
        className={className}
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
