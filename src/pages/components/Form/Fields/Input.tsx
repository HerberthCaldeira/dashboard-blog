import { useFormContext } from "react-hook-form";
import { FieldTypeErrors } from "./types/fieldsTypes";
import ErrorValidationMessage from "../ErrorValidationMessage";

interface InputProps extends FieldTypeErrors {
  name: string;
  label: string;
  type?: "text" | "email" | "time" | "password";
  placeholder?: string;
}

export default function Input({
  label,
  type,
  name,
  placeholder,
  frontErrors,
  serverErrors,
}: InputProps) {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="">
        {label}
      </label>
      <input type={type} placeholder={placeholder} {...register(name)} />
      <ErrorValidationMessage
        frontErrors={frontErrors}
        serverErrors={serverErrors}
        field="name"
      />
    </div>
  );
}
