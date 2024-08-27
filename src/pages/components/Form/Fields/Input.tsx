import { useFormContext } from "react-hook-form";
import { InputProps } from "./types/fieldsTypes";
import ErrorValidationMessage from "../ErrorValidationMessage";

export default function Input({
  name,
  label,
  type,
  placeholder,
  errors,
}: InputProps) {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="">
        {label}
      </label>
      <input type={type} placeholder={placeholder} {...register(name)} />
      <ErrorValidationMessage errors={errors} field="name" />
    </div>
  );
}
